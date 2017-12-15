
var MyGen = {};
MyGen['u_param'] = function(blk) { return 'u'; };
MyGen['v_param'] = function(blk) { return 'v'; };
MyGen['math_number'] = function(blk) { var v = blk.getField('NUM').getValue(); return v===null ? '0.0' : parseFloat(v).toFixed(2); };

MyGen['rotation'] = function(blk) {
    var axis = blk.getFieldValue('AXIS');
    var angle =  getFieldValue(blk, 'ANGLE', '0.0');
    var fn = 'rx';
    if(axis == 'Z') fn = 'rz'; else if(axis == 'Y') fn = 'ry';
    return 'p = '+fn+'(p,(' + angle + ')*6.283185307179586);';
};
MyGen['translation'] = function(blk) {
    var x = getFieldValue(blk, 'X', '0.0', 1.0);
    var y = getFieldValue(blk, 'Y', '0.0', 1.0);
    var z = getFieldValue(blk, 'Z', '0.0', 1.0);
    return 'p += vec3('+x+','+y+','+z+');';
};

function getFieldValue(blk, name, defValue) {
    var node = blk.getInputTargetBlock(name);
    if(!node) return defValue;
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


Blockly.defineBlocksWithJsonArray([
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
{
  "type": "rotation",
  "message0": "Rotate(%1, 360° * %2) %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AXIS",
      "options": [
        [
          "X_axis",
          "X"
        ],
        [
          "Y_axis",
          "Y"
        ],
        [
          "Z_axis",
          "Z"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "ANGLE"
    },
    {
      "type": "input_dummy"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 130,
  "tooltip": "",
  "helpUrl": ""
}    ,
{
  "type": "translation",
  "message0": "Translate(%1 , %2 , %3 ) %4",
  "args0": [
    {
      "type": "input_value",
      "name": "X"
    },
    {
      "type": "input_value",
      "name": "Y"
    },
    {
      "type": "input_value",
      "name": "Z"
    },
    {
      "type": "input_dummy"
    },
  ],
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
    ]);

 var ws = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
      
  
 ws.addChangeListener(foo);    
 