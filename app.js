'use strict'
const prompt = require('prompt-sync')();
const {Validator} = require('./lib/utils/validator.js');
const {Compiler} = require('./lib/compiler/compiler.js');
const {Printer} = require('./lib/utils/printer.js');

const CODE_QUIT = 'q';
const CODE_EXPR = 'e';

const v = new Validator;
const c = new Compiler;
const p = new Printer;

const askExpr = () => {
  let expr;
  while (true) {
    expr = prompt("Enter expression: ");
    expr = v.normaliseExpr(expr);

    if (expr == CODE_QUIT) break;
    const status = v.validateExpr(expr);
    if (status == 'valid') break;
    p.printError(status)
  }
  return expr;
}

const askValue = () => {
  let value;
  while (true) {
    value = prompt("Enter value: ");
    value = v.normaliseValue(value);

    if (value == CODE_QUIT|| value == CODE_EXPR) break;
    const status = v.validateValue(value);
    if (status == 'valid') break;
    p.printError(status)
  }
  return value;
}

const main = () => {
  let value = 0;
  let expr = askExpr();
  if (expr == CODE_QUIT) process.exit(0);
  c.compile(expr);

  if (expr.includes('x')) {
    while (1) {
      value = askValue();
      if (value == CODE_QUIT) process.exit(0);
      if (value == CODE_EXPR) break;

      const result = c.compute({x:Number(value)});
      p.printResult(result);
    }
    return;
  }

  const result = c.compute({x:Number(value)});
  p.printResult(result);
}

p.printYellow("Welcome to Grafico App");
p.print("");
while (true) {
  main();
}