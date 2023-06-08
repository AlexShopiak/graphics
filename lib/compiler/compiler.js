'use strict'

const {Parser} = require('./parser.js')
const {Tokenizer} = require('./tokenizer.js')
const {Environment} = require('./environment.js')
const {DataBase} = require('../db/db.js')

class Compiler {
    globalEnv = new Environment({
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,

        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
        
        asinh: Math.asinh,
        acosh: Math.acosh,
        atanh: Math.atanh,

        log: Math.log,
        sqrt: Math.sqrt,
        cbrt: Math.cbrt,
        abs: Math.abs,

    });

    funcBuff;
    #ast;
    #db;

    constructor() {
        this.#db = new DataBase();
        this.#db.start();
    }

    compile(expr) {
        const parser = new Parser(new Tokenizer());
        const DBast = this.#db.read(expr);
        if (DBast) {
            this.#ast = DBast;
        } else {
            this.#ast = parser.parse(expr);
            this.#db.write(expr, this.#ast);
        }      
    }

    compute(value) {
        return this.#evaluate(this.#ast, new Environment({x:value}, this.globalEnv));
    }

    saveHistory() {
        this.#db.finish();
    }

    #evaluate(node, env) {
        switch (node.type) {
            case 'binary': {
                const left = this.#evaluate(node.left, env);
                const right = this.#evaluate(node.right, env);
                return this.#binaryEval(node.op, left, right);
            }
            case 'call': {
                const fn = env.lookup(node.fn);
                const args = node.args.map(arg => this.#evaluate(arg, env));
                return fn.apply(null, args);
            }
            case 'ident':
                return env.lookup(node.value);
            case 'number':
                return +node.value;
            case 'expr':
                return this.compile(node.value);
        }
    }

    #binaryEval(op, left, right) {
        if (op === '+') return left + right;
        if (op === '-') return left - right;
        if (op === '*') return left * right;
        if (op === '/') return left / right;
        if (op === '^') return left ** right;
    }
}

module.exports = {Compiler}