'use strict'

const {Validator} = require('../lib/utils/validator.js');
const v = new Validator;

test('expression normaliser', () => {
    let expr = v.normaliseExpr('x + 3+  4* 5-6');
    expect(expr).toEqual('x+3+4*5-6');

    expr = v.normaliseExpr('-x+3');
    expect(expr).toEqual('0-x+3');

    expr = v.normaliseExpr('+x+3');
    expect(expr).toEqual('x+3');
})

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

    status = v.validateExpr('y*6*x/4+x');
    expect(status).toEqual('error-msg');

    status = v.validateExpr('y*6*y/4+z');
    expect(status).toEqual('error-msg');

    status = v.validateExpr('y*6*y/4+y');
    expect(status).toEqual('error-msg');
})


test('value normaliser', () => {
    let value = v.normaliseValue('  35 ');
    expect(value).toEqual('35');

    value = v.normaliseValue('+35');
    expect(value).toEqual('35');
})

test('value validator', () => {
    let status = v.validateValue('6');
    expect(status).toEqual('valid');

    status = v.validateValue('-0.45');
    expect(status).toEqual('valid');

    status = v.validateValue('-0,45');
    expect(status).toEqual('error-msg');

    status = v.validateValue('a');
    expect(status).toEqual('error-msg');

    status = v.validateValue('1-56');
    expect(status).toEqual('error-msg');

    status = v.validateValue('4r');
    expect(status).toEqual('error-msg');

    status = v.validateValue('');
    expect(status).toEqual('error-msg');
})

test('variable has-er', () => {
    let status = v.hasVariable('3+x+5')
    expect(status).toEqual(true);

    status = v.hasVariable('3+y+5')
    expect(status).toEqual(false);

    status = v.hasVariable('3+5')
    expect(status).toEqual(false);
})