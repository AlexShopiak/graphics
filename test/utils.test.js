'use strict'

const {Validator} = require('../lib/utils/validator.js');
const v = new Validator;

test('expression validator', () => {
    let status = v.validateExpr('x+3+4*5-6');
    expect(status).toEqual('valid');

    status = v.validateExpr('x*6*x/4+x');
    expect(status).toEqual('valid');

    status = v.validateExpr('4+5');
    expect(status).toEqual('valid');

    status = v.validateExpr('x--x');
    expect(status).toEqual('error-msg');

    status = v.validateExpr('*-x*');
    expect(status).toEqual('error-msg');

    status = v.validateExpr('+');
    expect(status).toEqual('error-msg');
})

test('value validator', () => {
    let status = v.validateValue('6');
    expect(status).toEqual('valid');

    status = v.validateValue('-0.45');
    expect(status).toEqual('valid');

    status = v.validateValue('a');
    expect(status).toEqual('error-msg');

    status = v.validateValue('1-56');
    expect(status).toEqual('error-msg');

    status = v.validateValue('4r');
    expect(status).toEqual('error-msg');

    status = v.validateValue('');
    expect(status).toEqual('error-msg');
})

test('variable searcher', () => {
    let variable = v.searchVariable('x+5-6');
    expect(variable).toEqual('x');

    variable = v.searchVariable('5-y');
    expect(variable).toEqual('y');

    variable = v.searchVariable('a*4');
    expect(variable).toEqual('a');

    variable = v.searchVariable('45/32-4');
    expect(variable).toEqual('null');

    variable = v.searchVariable('4-45*85');
    expect(variable).toEqual('null');
})