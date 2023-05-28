'use strict'
const prompt = require('prompt-sync')();
const {Validator} = require('./lib/validator.js');
const {Parser} = require('./lib/parser/parser.js');

const v = new Validator;
const p = new Parser;

const main = () => {
  //Ask for expression
  let expr;
  while (1) {
    expr = prompt("Enter expression: ");
    expr = v.normaliseExpr(expr);
    const status = v.validateExpr(expr);
    if (status == 'valid') break;
    console.log(status);
  }
  
  //Ask for values
  const variable = v.searchVariable(expr);
  if (variable != 'null') {
    let value;
    while (1) {
      value = prompt("Enter value: ");
      const status = v.validateValue(value);
      if (status == 'valid') break;
      console.log(status);
    }
    expr = expr.replaceAll(variable, value);
  }
  
  //Parse
  const result = p.parseAndCompute(expr);
  console.log(result);
}
main();