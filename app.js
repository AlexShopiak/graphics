'use strict'
const prompt = require('prompt-sync')();
const {validateExpr, validateValue, searchVariable} = require('./lib/utils.js');
const {parseAndCompute} = require('./lib/parser/parser.js');

const main = () => {
    let expr;
    while (1) {
      expr = prompt("Enter expression: ");
      const status = validateExpr(expr);
      if (status == 'valid') break;
      console.log(status);
    }
    
    const variable = searchVariable(expr);
    if (variable != 'null') {
      let value;
      while (1) {
        value = prompt("Enter value: ");
        const status = validateValue(expr);
        if (status == 'valid') break;
        console.log(status);
      }
      expr = expr.replaceAll(variable, value);
    }
  
    const result = parseAndCompute(expr);
    console.log(result);
}
main();