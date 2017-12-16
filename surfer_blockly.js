
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
        "helpUrl": "",
        "tooltip": "",
        "extensions": ["parent_tooltip_when_inline"]
    },
    // rotation
    {
        "type": "rotation",
        "message0": "Rotate about %1 %2 by 180 ° * %3",
        "args0": [
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
        "message0": "Translate X %1 Y %2 Z %3",
        "args0": [
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
      "type": "fun",
      "message0": "%1 ( %2 )",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "fname",
          "options": [
        [
          "sin",
          "sin"
        ],
        [
          "cos",
          "cos"
        ]
          ]
        },
        {
          "type": "input_value",
          "name": "ARG"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    }
]);

var MyGen = {};
MyGen['u_param'] = function(blk) { return 'u'; };
MyGen['v_param'] = function(blk) { return 'v'; };
MyGen['math_number'] = function(blk) {
    var v = blk.getField('NUM').getValue();
    return v===null ? '0.0' : parseFloat(v).toFixed(2);
};
MyGen['rotation'] = function(blk) {
    var axis = blk.getFieldValue('AXIS');
    var angle =  getFieldValue(blk, 'ANGLE', '0.0');
    var fn = 'rx';
    if(axis == 'Z') fn = 'rz'; else if(axis == 'Y') fn = 'ry';
    return 'p = '+fn+'(p,(' + angle + ')*PI*0.5);';
};
MyGen['translation'] = function(blk) {
    var x = getFieldValue(blk, 'X', '0.0');
    var y = getFieldValue(blk, 'Y', '0.0');
    var z = getFieldValue(blk, 'Z', '0.0');
    return 'p += vec3('+x+','+y+','+z+');';
};
MyGen['linear'] = function(blk) {
    var x = getFieldValue(blk, 'A', '0.0');
    var y = getFieldValue(blk, 'B', '0.0');
    var z = getFieldValue(blk, 'C', '0.0');
    return '(' + x + '*' + y + '+' + z + ')';
};
MyGen['fun'] = function(blk) {
    var fname = blk.getFieldValue('fname');
    var arg = getFieldValue(blk, 'ARG', '0.0');
    return fname + '((' + arg  + ')*PI)';
};

function getFieldValue(blk, name, defValue) {
    var node = blk.getInputTargetBlock(name);
    if(!node) return defValue;
    var f = MyGen[node.type];
    if(f == null)  {
        console.log("ops:", node.type);
        return defValue;
    }
    var value = MyGen[node.type](node);
    if(value === null) return defValue;
    else return value;
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


 var ws = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});


 ws.addChangeListener(foo);
