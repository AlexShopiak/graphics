'use strict'

const {validateExpr, validateValue, searchVariable} = require('../lib/utils.js');

test('expression validator', () => {
    let status = validateExpr('x+3+4*5-6');
    expect(status).toEqual('valid');

    status = validateExpr('x*6*x/4+x');
    expect(status).toEqual('valid');

    status = validateExpr('4+5');
    expect(status).toEqual('valid');

    status = validateExpr('x--x');
    expect(status).toEqual('error-msg');

    status = validateExpr('*-x*');
    expect(status).toEqual('error-msg');

    status = validateExpr('+');
    expect(status).toEqual('error-msg');
})

test('value validator', () => {
    let status = validateValue('6');
    expect(status).toEqual('valid');

    status = validateValue('-0.45');
    expect(status).toEqual('valid');

    status = validateValue('a');
    expect(status).toEqual('error-msg');

    status = validateValue('1-56');
    expect(status).toEqual('error-msg');

    status = validateValue('4r');
    expect(status).toEqual('error-msg');

    status = validateValue('');
    expect(status).toEqual('error-msg');
})

test('variable searcher', () => {
    let variable = searchVariable('x+5-6');
    expect(variable).toEqual('x');

    variable = searchVariable('5-y');
    expect(variable).toEqual('y');

    variable = searchVariable('a*4');
    expect(variable).toEqual('a');

    variable = searchVariable('45/32-4');
    expect(variable).toEqual('null');

    variable = searchVariable('4-45*85');
    expect(variable).toEqual('null');
})