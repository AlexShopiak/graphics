'use strict'
const prompt = require('prompt-sync')();
const {Validator} = require('./lib/utils/validator.js');
const {Compiler} = require('./lib/compiler/compiler.js');

const v = new Validator;
const c = new Compiler;

const askExpr = () => {
  let expr;
  while (1) {
    expr = prompt("Enter expression: ");
    expr = v.normaliseExpr(expr);

    if (expr == 'q') break;
    const status = v.validateExpr(expr);
    if (status == 'valid') break;

    console.log("Error: ", status);
  }
  return expr;
}

const askValue = () => {
  let value;
  while (1) {
    value = prompt("Enter value: ");
    value = v.normaliseValue(value);

    if (value == 'q'|| value == 'e') break;
    const status = v.validateValue(value);
    if (status == 'valid') break;

    console.log("Error: ", status);
  }
  return value;
}

const main = () => {
  let value = 0;
  let expr = askExpr();
  if (expr == 'q') process.exit(0);
  c.compile(expr);

  if (expr.includes('x')) {
    while (1) {
      value = askValue();
      if (value == 'q') process.exit(0);
      if (value == 'e') break;

      const result = c.compute({x:Number(value)});
      console.log("Result: ", result);
    }
    return;
  }

  const result = c.compute({x:Number(value)});
  console.log("Result: ", result);
}

console.log("Welcome to Grafico App");
while (1) {
  main();
}