"use strict";

twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var v3 = twgl.v3;
var gl;
var shape;

function SurfaceViewer(canvasName) {

    gl = this.gl = twgl.getWebGLContext(document.getElementById(canvasName));
    shape = this.shape = twgl.primitives.createSphereBufferInfo(gl, 1, 120, 120);
    this.grid = this.makeGrid(gl);

    this.buttonDown = false;
    this.theta = 0;
    this.phi = 0;

    var _this = this;
    gl.canvas.addEventListener('mousedown', function(e) {_this.onMouseDown(e);}, false);
    gl.canvas.addEventListener('mouseup',   function(e) {_this.onMouseUp(e);}, false);
    gl.canvas.addEventListener('mousemove', function(e) {_this.onMouseMove(e);}, false);

    gl.canvas.addEventListener('mousewheel', function(e) {
        console.log(e);
        e.stopPropagation();
        e.preventDefault();
        _this.distance = Math.max(5, _this.distance - e.wheelDelta *0.01);
    }, false);

    this.programManager = new ProgramManager(gl);


    this.camera = m4.identity();
    this.view = m4.identity();
    this.viewProjection = m4.identity();
    this.distance = 5;

    this.uniforms = {
        u_lightWorldPos: [1, 8, 10],
        u_lightColor: [1, 1, 1, 1],
        u_diffuseMult: [0.5,0.3,0.8,1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_viewInverse: this.camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
        u_time: 0,
        u_cc: [0,0,0,0,0,0,0,0,0,0]
    };
}

SurfaceViewer.prototype.onMouseDown = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.buttonDown = true;
    this.lastPos = this.getMouseEventPos(e);
}
SurfaceViewer.prototype.onMouseUp = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.buttonDown = false;
}
SurfaceViewer.prototype.onMouseMove = function(e) {
    e.stopPropagation();
    e.preventDefault();
    if(this.buttonDown) {
        var p = this.getMouseEventPos(e);
        var dx = p.x - this.lastPos.x;
        var dy = p.y - this.lastPos.y;
        console.log(dx,dy);
        this.lastPos = p;
        this.theta += dy*0.01;
        this.phi += dx*0.01;
    }
}



SurfaceViewer.prototype.drawScene = function(time) {

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    // gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



    var eye = v3.copy([0, 0, this.distance]);
    var target = v3.copy([0, 0, 0]);
    var up = [0, 1, 0];
    var tex = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: [
        255, 255, 255, 255,
        192, 192, 192, 255,
        192, 192, 192, 255,
        255, 255, 255, 255,
      ],
    });

    // set viewProjection
    var fovy = 30 * Math.PI / 180;
    var projection = m4.perspective(
        fovy,
        gl.canvas.clientWidth / gl.canvas.clientHeight,
        0.5, 200);
    m4.lookAt(eye, target, up, this.camera);
    m4.inverse(this.camera, this.view);
    m4.multiply(projection, this.view, this.viewProjection);


    var uni = this.uniforms;

    var world = uni.u_world;
    m4.identity(world);
    //m4.translate(world, obj.translation, world);
    m4.rotateX(world, this.theta, world);
    m4.rotateZ(world, this.phi, world);

    m4.transpose(
       m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
    m4.multiply(this.viewProjection, uni.u_world, uni.u_worldViewProjection);

    var pi = this.programManager.getCurrentProgramInfo();
    gl.useProgram(pi.program);
    twgl.setBuffersAndAttributes(gl, pi, shape);
    this.uniforms.u_time = time;
    twgl.setUniforms(pi, this.uniforms);
    twgl.drawBufferInfo(gl, shape, gl.TRIANGLES);

    pi = this.programManager.linesProgram;
    gl.useProgram(pi.program);
    twgl.setBuffersAndAttributes(gl, pi, this.grid);
    this.uniforms.u_time = time;
    twgl.setUniforms(pi, this.uniforms);
    twgl.drawBufferInfo(gl, this.grid, gl.LINES);


}


SurfaceViewer.prototype.getMouseEventPos = function (e) {
    /*
    var rect = e.currentTarget.getBoundingClientRect(),
    offsetX = e.clientX - rect.left,
    offsetY = e.clientY - rect.top;
    return {x:offsetX, y:offsetY};
    */
    return {x:e.offsetX, y:e.offsetY};
}

SurfaceViewer.prototype.makeGrid = function(gl) {
    var m = 9;
    var arrays = {
      position: twgl.primitives.createAugmentedTypedArray(3, m*2),
      color: twgl.primitives.createAugmentedTypedArray(3, m*2),
    };

    var addLine = function (x0,y0,z0, x1,y1,z1, r,g,b) {
        arrays.position.push(x0,y0,z0, x1,y1,z1);
        arrays.color.push(r,g,b,r,g,b);
    }

    var r = 2.0;

    addLine(-r,0,0, r,0,0, 1,0,0);
    addLine(0,-r,0, 0,r,0, 0,1,0);
    addLine(0,0,-r, 0,0,r, 0,0,1);

    var d = 0.1;
    addLine(r,0,0, r-d, d,0, 1,0,0);
    addLine(r,0,0, r-d,-d,0, 1,0,0);

    addLine(0,r,0,  d,r-d,0, 0,1,0);
    addLine(0,r,0, -d,r-d,0, 0,1,0);

    addLine(0,0,r, 0, d,r-d, 0,0,1);
    addLine(0,0,r, 0,-d,r-d, 0,0,1);


    var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    return bufferInfo;
}
