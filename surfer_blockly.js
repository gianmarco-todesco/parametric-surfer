
Blockly.defineBlocksWithJsonArray([
    // math_number
    {
        "type": "math_number",
        "message0": "%1",
        "args0": [{
            "type": "field_number",
            "name": "NUM",
            "value": 0
        }],
        "output": "Number",
        "colour": 230,
    },
    // rotation
    {
        "type": "rotation",
        "message0": "Rotate %1 %2 %3by 180 ° * %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["X axis", "X"],
                    ["Y axis", "Y"],
                    ["Z axis", "Z"]]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "ANGLE",
                "align": "RIGHT",
                "check": "Number",
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 130,
        "tooltip": "",
        "helpUrl": ""
    },
    // translation
    {
        "type": "translation",
        "message0": "Tr %1 X %2 Y %3 Z %4",
        "args0": [
            {
              "type": "input_dummy",
              "align": "RIGHT",
            },
            {
              "type": "input_value",
              "name": "X",
              "align": "RIGHT",
              "check": "Number",
            },
            {
              "type": "input_value",
              "name": "Y",
              "align": "RIGHT",
              "check": "Number",
            },
            {
              "type": "input_value",
              "name": "Z",
              "align": "RIGHT",
              "check": "Number",
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 130,
        "tooltip": "",
        "helpUrl": ""
    },
    {
      "type": "u_param",
      "message0": "U",
      "output": null,
      "colour": 40,
      "tooltip": "",
      "helpUrl": ""
    }
    ,
    {
      "type": "v_param",
      "message0": "V",
      "output": null,
      "colour": 40,
      "tooltip": "",
      "helpUrl": ""
    }
    ,
    {
      "type": "t_param",
      "message0": "T",
      "output": null,
      "colour": 40,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "linear",
      "message0": "%1 * %2 + %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A"
        },
        {
          "type": "input_value",
          "name": "B"
        },
        {
          "type": "input_value",
          "name": "C"
        }
      ],
      "inputsInline": false,
      "output": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "sin",
      "message0": "sin(%1 · %2 + %3) · %4",
      "args0": [
        {
          "type": "input_value",
          "name": "T",
          "align": "RIGHT",
        },
        {
          "type": "input_value",
          "name": "A",
          "align": "RIGHT",
        },
        {
          "type": "input_value",
          "name": "B",
          "align": "RIGHT",
        },
        {
          "type": "input_value",
          "name": "C",
          "align": "RIGHT",
        },
      ],
      "output": "Number",
      "inputsInline": true,
      "colour": 230,
    },
    {
        "type":"output",
        "message0": "ciccio",
        "message0": "Output",
        "previousStatement": null,
        "colour": 300,
    }
]);


/*


Generator['translation'] = function(blk) {
    var r = {};
    r.x = getFieldValue(blk, 'X');
    r.y = getFieldValue(blk, 'Y');
    r.z = getFieldValue(blk, 'Z');
    return r;
};
Generator['rotation'] = function(blk) {
    var axis = blk.getFieldValue('AXIS');
    var angle =  getFieldValue(blk, 'ANGLE');
    var fn = 'rx';
    if(axis == 'Z') fn = 'rz'; else if(axis == 'Y') fn = 'ry';
    return 'p = '+fn+'(p,(' + angle + ')*PI);';
};
Generator['fun'] = function(blk) {
    var fname = blk.getFieldValue('fname');
    var arg = getFieldValue(blk, 'ARG', '0.0');
    return fname + '((' + arg  + ')*PI)';
};

function getFieldValue(blk, name) {
    const zero = { type: 'const', value:0.0 };
    var node = blk.getInputTargetBlock(name);
    if(!node) return zero;
    var f = Generator[node.type];
    if(f == null)  {
        console.log("ops:", node.type);
        return zero;
    }
    var value = Generator[node.type](node);
    return value === null ? zero : value;
}

var formulas = [];
var count = 0;

function arrayEqual(a,b) {
    if(a.length != b.length) return false;
    for(var i=0;i<a.length;i++) if(a[i]!=b[i]) return false;
    return true;
}

function foo() {
    var newFormulas = [];
    ws.getTopBlocks().forEach(function(blk) {
    if(blk.type == 'translation' || blk.type ==  'rotation') {
    var formula = '';
    for(;;) {
    var q = MyGen[blk.type](blk);
    formula += q;
    var nextBlock = blk.nextConnection && blk.nextConnection.targetBlock();
    if(!nextBlock) break;
    blk = nextBlock;
    }
    newFormulas.push(formula);
    }
    });
    if(!arrayEqual(newFormulas, formulas)) {
    count++;
    console.log(count, newFormulas, formulas);
    formulas = newFormulas;
    please(formulas);
    }
 }
*/

 var ws;
 function initializeSurfaceBlockly(divName) {
    var toolbox = `<xml>
        <block type="u_param"></block>
        <block type="v_param"></block>
        <block type="t_param"></block>
        <block type="math_number"></block>
        <block type="translation">
            <value name="X">
                <shadow type="math_number"><field name="NUM">0</field></shadow>
            </value>
            <value name="Y">
                <shadow type="math_number"><field name="NUM">0</field></shadow>
            </value>
            <value name="Z">
                <shadow type="math_number"><field name="NUM">0</field></shadow>
            </value>
        </block>
        <block type="rotation"></block>
        <block type="sin">
        </block>
        <block type="linear">
        </block>    
        <block type="output"></block>    
        </xml>`;
     
    ws = Blockly.inject(divName, {
        toolbox: toolbox,
        // trashcan: true,
        horizontalLayout: true,
    });
    // ws.addChangeListener(foo); 
    load();
 }

 
function foobar() {
    var lst = [];
    ws.getAllBlocks().forEach(function(blk) {
        if(blk.type == 'output') {
            var c = [];
            var s = blk.previousConnection.targetBlock();
            while(s) {
                c.push(s);
                s = s.previousConnection.targetBlock();                        
            }
            c.reverse();
            console.log(c.map(b=>b.type));
            lst.push(c);
        }
    });
    return lst;
 }
 
 
function save() {
    var xml = Blockly.Xml.workspaceToDom(ws);
    var xml_text = Blockly.Xml.domToText(xml);
    localStorage.setItem('surfer2-ws',xml_text);
}

function load() {
    ws.clear();
    var xml_text = localStorage.getItem('surfer2-ws');
    var xml = Blockly.Xml.textToDom(xml_text);
    Blockly.Xml.domToWorkspace(xml, ws);
}

function SimpleExpr(s,prec) {    
    this.str = s;
    this.prec = prec || 0;
}

SimpleExpr.prototype.toString = function() {
    return this.str;
}

SimpleExpr.makeConst = function(v) {
    if(/^-?\d+$/.test(v)) {
        return new SimpleExpr(v + '.0');
    }
    else if(/^-?\d+(\.\d*([eE]-?\d+)?)?$/.test(v)) {
        return new SimpleExpr(v+'');        
    }
    else if(/^[a-zA-Z]\w*$/.test(v)) {
        return new SimpleExpr(v);                
    }
    else throw "Bad constant value";
}

SimpleExpr.zero = SimpleExpr.makeConst(0);
SimpleExpr.one = SimpleExpr.makeConst(1);

SimpleExpr.makeParam = function(name) {
    if(name == "u" || name == "v" || name == "t") 
        return new SimpleExpr(name);
    else
        throw "Bad parameter";
}

SimpleExpr.prototype.add = function(other) {
    if(this.str == 0) return other;
    else if(other.str == 0) return this;
    else return new SimpleExpr(this.str + " + " + other.str, 2);
}

SimpleExpr.prototype.mult = function(other) {
    if(this.str == 1) return other;
    else if(other.str == 1) return this;
    else if(this.str == 0) return this;
    else if(other.str == 0) return other;
    var s1 = this.prec>=2 ? "(" + this.str + ")" : this.str;
    var s2 = other.prec>=2 ? "(" + other.str + ")" : other.str;    
    return new SimpleExpr(s1 + " * " + s2, 1);
}

SimpleExpr.prototype.fun = function(fname) {
    return new SimpleExpr(fname + "(" + this.str + ")");
}

function Expr(val,du,dv) {
    this.val = val;
    this.du = du;
    this.dv = dv;
}

Expr.prototype.toString = function() {
    return "val=" + this.val.toString() 
         + " du=" + this.du.toString()
         + " dv=" + this.dv.toString();
}

Expr.makeConst = function(v) {
    return new Expr(
        SimpleExpr.makeConst(v), 
        SimpleExpr.zero, 
        SimpleExpr.zero);
}
Expr.makeParam = function(name) {
    var cdu = name == "u" ? SimpleExpr.one : SimpleExpr.zero;
    var cdv = name == "v" ? SimpleExpr.one : SimpleExpr.zero;
    return new Expr(SimpleExpr.makeParam(name), cdu, cdv);
}
Expr.prototype.add = function(other) {
    return new Expr(
        this.val.add(other.val),
        this.du.add(other.du),
        this.dv.add(other.dv),
    );
}
Expr.prototype.mult = function(other) {
    return new Expr(
        this.val.mult(other.val),
        this.du.mult(other.val).add(this.val.mult(other.du)),
        this.dv.mult(other.val).add(this.val.mult(other.dv))
    );
}
Expr.prototype.sin = function() {
    return new Expr(
        this.val.fun('sin'),
        this.val.fun('cos').mult(this.du),
        this.val.fun('cos').mult(this.dv)
    );    
}
Expr.prototype.cos = function() {
    return new Expr(
        this.val.fun('cos'),
        this.val.fun('-sin').mult(this.du),
        this.val.fun('-sin').mult(this.dv)
    );    
}


var Generator = {};
Generator['u_param'] = function(blk) { return Expr.makeParam('u'); }
Generator['v_param'] = function(blk) { return Expr.makeParam('v'); }
Generator['t_param'] = function(blk) { return Expr.makeParam('t'); }
Generator['math_number'] = function(blk) {
    var v = blk.getField('NUM').getValue();
    if(v===null) v = 0.0;
    return Expr.makeConst(v);
};
Generator['linear'] = function(blk) {
    var a = getFieldValue(blk, 'A', 1.0);
    var b = getFieldValue(blk, 'B', 1.0);
    var c = getFieldValue(blk, 'C', 0.0);
    return a.mult(b).add(c);
};
Generator['sin'] = function(blk) {
    var t = getFieldValue(blk, 'T', 1.0);
    var a = getFieldValue(blk, 'A', 1.0);
    var b = getFieldValue(blk, 'B', 0.0);
    var c = getFieldValue(blk, 'C', 1.0);
    return t.mult(a).add(b).sin().mult(c);
};

function getBlockValue(blk, defValue) {
    defValue = defValue | 0.0;
    var f = Generator[blk.type];
    if(f == null)  {
        console.log("ops:", blk.type);
        return Expr.makeConst(defValue);
    }
    var value = Generator[blk.type](blk);
    return value === null ? Expr.makeConst(defValue) : value;    
}

function getFieldValue(blk, name, defValue) {
    var node = blk.getInputTargetBlock(name);
    if(!node) return Expr.makeConst(defValue);
    else return getBlockValue(node, defValue);
}

Generator2 = {};
Generator2['translation'] = function(blk) {
    var prevBlk = blk.previousConnection.targetBlock();
    if(prevBlk) {
        Generator2[prevBlk.type](prevBlk);
    }
    var x = getFieldValue(blk, 'X', 0.0);
    var y = getFieldValue(blk, 'Y', 0.0);
    var z = getFieldValue(blk, 'Z', 0.0);
    console.log('Translate');
    console.log('  x ', x.toString());
    console.log('  y ', x.toString());
    console.log('  z ', x.toString());
    
};

var b;
function foo() {
    b = foobar()[0][0];
    ris = Generator2[b.type](b);
}
