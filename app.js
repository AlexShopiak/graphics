'use strict'
const prompt = require('prompt-sync')();
const {exprIsValid, exprIsAlgebraic, valueIsValid} = require('./lib/validators/validators.js');
const {parseAndCompute} = require('./lib/parser/parser.js');

const main = async () => {
    let expr;
    while (1) {
        expr = prompt('Enter expression: ');
        if(exprIsValid(expr)) {
            break;
        }
        console.log('Invalid format. Try again');
    }  

    if (exprIsAlgebraic(expr)){
        let value;
        while (1) {
            value = prompt('Enter value: ');
            if(valueIsValid(value)) {
                break;
            }
            console.log('Invalid format. Try again');
        } 
        const variable = 'x';//todo
        expr = expr.replaceAll(variable, value);
    }
    const result = parseAndCompute(expr);
    console.log(result);
}
main();