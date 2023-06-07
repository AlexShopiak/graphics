'use strict'

const {Tokenizer} = require('./tokenizer.js');

class Parser {
    #tokenizer;
    #currentToken;
    
    constructor(tokenizer) {
        this.#tokenizer = tokenizer;
    }
    
    parse(expr) {
        this.#tokenizer.readExpr(expr);
        this.#currentToken = this.#tokenizer.next();
        return this.#EXPRESSION();
    }

    #EXPRESSION() {
        return this.#ADDITION();
    }

    #ADDITION() {
        let left = this.#CALL();
        while (this.#isCurrent('+', '-')) {
            left = {
                type: 'binary',
                left,
                op: this.#eat('+', '-').type,
                right: this.#CALL(),
            };
        }
        return left;
    }

    #CALL() {
        const maybeCall = this.#MULTIPLICATION();
        if (this.#isCurrent('NUMBER', 'IDENT')) {
            return {
                type: 'call',
                fn: maybeCall.value,
                args: [this.#CALL()],
            };
        }
        if (this.#isCurrent('(')) {
            this.#eat('(');
            const args = [this.#EXPRESSION()];
            while (this.#isCurrent(',')) {
                this.#eat(',');
                args.push(this.#EXPRESSION());
            }
            this.#eat(')');
            return { 
                type: 'call', 
                fn: maybeCall.value, 
                args 
            };
        }
        return maybeCall;
    }

    #MULTIPLICATION() {
        let left = this.#EXPONENTIATION();
        while (this.#isCurrent('*', '/')) {
            left = {
                type: 'binary',
                left,
                op: this.#eat('*', '/').type,
                right: this.#EXPONENTIATION(),
            };
        }
        return left;
    } 

    #EXPONENTIATION() {
        let left = this.#BASIC();
        while (this.#isCurrent('^')) {
            left = {
                type: 'binary',
                left,
                op: this.#eat('^').type,
                right: this.#BASIC(),
            };
        }
        return left;
    }

    #BASIC() {
        if (this.#isCurrent('(')) {
            this.#eat('(');
            const expr = this.#EXPRESSION();
            this.#eat(')');
            return expr;
        }
        if (this.#isCurrent('NUMBER')) {
            return { 
                type: 'number', 
                value: this.#eat('NUMBER').token 
            };
        }
        if (this.#isCurrent('IDENT')) {
            return { 
                type: 'ident', 
                value: this.#eat('IDENT').token 
            };
        }
        if (this.#isCurrent('STRING')) {
            const subexpr = this.#eat('STRING').token.slice(1, -1); // Remove "..."
            new Parser(new Tokenizer()).parse(subexpr); // Test if sub-expr is valid
            return {
                type: 'expr',
                value: expr,
            };
        }
        throw new Error('Malformed expression');
    }

    #eat(...tokenTypes) {
        const token = this.#currentToken;
        if (!token) {
            throw new Error(
                `Unexpected end of input; expected ${token.type}`
            );
        }
        if (!tokenTypes.includes(this.#currentToken.type)) {
            throw new Error(
                `Expected ${tokenType} === ${token.type}`
            );
        }
        this.#currentToken = this.#tokenizer.next();
        return token;
    }

    #isCurrent(...tokenTypes) {
        return tokenTypes.includes(this.#currentToken?.type);
    }
}

module.exports = {Parser}