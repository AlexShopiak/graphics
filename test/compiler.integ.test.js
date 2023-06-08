'use strict'

const {Compiler} = require('../lib/compiler/compiler.js');
const c = new Compiler;

test('results and aoperations', () => {
    c.compile('5 + 14');
    let res = c.compute();
    expect(res).toEqual(19);

    c.compile('x + 1');
    res = c.compute(4);
    expect(res).toEqual(5);

    c.compile('x - 2');
    res = c.compute(4);
    expect(res).toEqual(2);

    c.compile('x * 2');
    res = c.compute(4);
    expect(res).toEqual(8);

    c.compile('x / 2');
    res = c.compute(4);
    expect(res).toEqual(2);

    c.compile('x ^ 2');
    res = c.compute(4);
    expect(res).toEqual(16);
})

test('Braces', () => {
    c.compile('(5)');
    let res = c.compute();
    expect(res).toEqual(5);

    c.compile('((x) + 1)');
    res = c.compute(4);
    expect(res).toEqual(5);

    c.compile('(((3))+(2))');
    res = c.compute();
    expect(res).toEqual(5);
})

test('Errors', () => {
    c.compile('sim(x)');
    expect(() => c.compute()).toThrow('Unspecified identifier "sim"');

    c.compile('4 + y');
    expect(() => c.compute()).toThrow('Unspecified identifier "y"');

    c.compile('cos(abc)');
    expect(() => c.compute()).toThrow('Unspecified identifier "abc"');

    expect(() => c.compile('(')).toThrow("Malformed expression");

    expect(() => c.compile('x+5-/')).toThrow('Malformed expression');
    
    expect(() => c.compile('*')).toThrow('Malformed expression');
})