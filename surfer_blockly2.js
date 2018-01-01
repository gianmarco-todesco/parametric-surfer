
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
    ws.addChangeListener(foo); 
    load();
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

SimpleExpr.Const = function(v) {
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

SimpleExpr.Zero = SimpleExpr.Const(0);
SimpleExpr.One = SimpleExpr.Const(1);

SimpleExpr.Param = function(name) {
    if(name == "u" || name == "v" || name == "u_time") 
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
SimpleExpr.prototype.sin = function() {
    return new SimpleExpr("sin(" + this.str + ")");
}


var GenVal = {};
GenVal['u_param'] = function(blk) { return SimpleExpr.Param('u'); }
GenVal['v_param'] = function(blk) { return SimpleExpr.Param('v'); }
GenVal['t_param'] = function(blk) { return SimpleExpr.Param('u_time') }
GenVal['math_number'] = function(blk) {
    var v = blk.getField('NUM').getValue();
    if(v===null) v = 0.0;
    return SimpleExpr.Const(v);
};
GenVal['linear'] = function(blk) {
    var a = getFieldValue(blk, 'A', 1.0);
    var b = getFieldValue(blk, 'B', 1.0);
    var c = getFieldValue(blk, 'C', 0.0);
    return a.mult(b).add(c);
};
GenVal['sin'] = function(blk) {
    var t = getFieldValue(blk, 'T', 1.0);
    var a = getFieldValue(blk, 'A', 1.0);
    var b = getFieldValue(blk, 'B', 0.0);
    var c = getFieldValue(blk, 'C', 1.0);
    return t.mult(a).add(b).mult(SimpleExpr.Const(Math.PI)).sin().mult(c);
};

function getBlockValue(blk, defValue) {
    defValue = defValue | 0.0;
    var f = GenVal[blk.type];
    if(f == null)  {
        console.log("ops:", blk.type);
        return SimpleExpr.Const(defValue);
    }
    var value = GenVal[blk.type](blk);
    return value === null ? SimpleExpr.Const(defValue) : value;    
}

function getFieldValue(blk, name, defValue) {
    var node = blk.getInputTargetBlock(name);
    if(!node) return SimpleExpr.Const(defValue);
    else return getBlockValue(node, defValue);
}



 
 function foo() {
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
            // console.log(c.map(b=>b.type));
            // lst.push(c);
            foo1(c);
        }
    });
    return lst;
 }

var onFormulaChanged = function(s) {}
var oldFormula = 'p = vec3(0.0,0.0,0.0);';

function foo1(lst) {
     var s = "";
     for(var i=0; i<lst.length; i++) {
         var item = lst[i];
         s += GenBlock[item.type](item);
     }
     if(s != oldFormula) {
        console.log(s);
        oldFormula = s;
        onFormulaChanged(s);
     }
}
 
 
 
 
function getBlockValue(blk, defValue) {
    defValue = defValue | 0.0;
    var f = GenVal[blk.type];
    if(f == null)  {
        console.log("ops:", blk.type);
        return SimpleExpr.Const(defValue);
    }
    var value = GenVal[blk.type](blk);
    return value === null ? SimpleExpr.Const(defValue) : value;    
}

function getFieldValue(blk, name, defValue) {
    var node = blk.getInputTargetBlock(name);
    if(!node) return SimpleExpr.Const(defValue);
    else return getBlockValue(node, defValue);
}

 
GenBlock = {};
GenBlock.translation = function(blk) {
    var x = getFieldValue(blk, 'X', 0.0);
    var y = getFieldValue(blk, 'Y', 0.0);
    var z = getFieldValue(blk, 'Z', 0.0);
    var s = "p += vec3(" + x + "," + y + "," + z + "); ";
    // console.log(s);
    return s;
} 
GenBlock.rotation = function(blk) {
    var axis = blk.getFieldValue('AXIS');
    var angle =  getFieldValue(blk, 'ANGLE', 0.0);
    var fn = 'rx';
    if(axis == 'Z') fn = 'rz'; else if(axis == 'Y') fn = 'ry';
    s = 'p = '+fn+'(p,' + angle.mult(SimpleExpr.Const('PI')).toString() + '); ';   
    // console.log(s);
    return s;
} 
 
