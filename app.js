'use strict'
const prompt = require('prompt-sync')();
const {validateExpr, validateValue, exprIsAlgebraic} = require('./lib/utils.js');
const {parseAndCompute} = require('./lib/parser/parser.js');

const main = async () => {
    let expr;
    while (1) {
      expr = prompt("Enter expression: ");
      const status = validateExpr(expr);
      if (status == 'valid') break;
      console.log(status);
    }
    
    if (exprIsAlgebraic(expr)) {
      let value;
      while (1) {
        value = prompt("Enter value: ");
        const status = validateValue(expr);
      if (status == 'valid') break;
      console.log(status);
      }
      const variable = "x"; //todo
      expr = expr.replaceAll(variable, value);
    }
  
    const result = parseAndCompute(expr);
    console.log(result);
}
main();