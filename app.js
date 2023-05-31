'use strict'
const prompt = require('prompt-sync')();
const {Validator} = require('./lib/utils/validator.js');
const {Parser} = require('./lib/parser/parser.js');

const v = new Validator;
const p = new Parser;

const main = () => {
  let expr;
  while (true) {
    expr = prompt("Enter expression: ");
    expr = v.normaliseExpr(expr);
    if (expr == 'q') process.exit(0);

    const status = v.validateExpr(expr);
    if (status == 'valid') break;
    console.log(status);
  }

  if (v.hasVariable(expr)) {
    let value;
    while (1) {
      value = prompt("Enter value: ");
      value = v.normaliseValue(value);
      if (value == 'q') process.exit(0);

      const status = v.validateValue(value);
      if (status == 'valid') break;
      console.log(status);
    }
    expr = expr.replaceAll('x', value);
  }
  
  const result = p.parseAndCompute(expr);
  console.log(result);
}
main();