'use strict'

class Tokenizer {
    #tokens = [
        [/^\s+/, null],
        [/^-?\d+(?:\.\d+)?/, 'NUMBER'],
        [/^[a-zA-Z]+/, 'IDENT'],
        [/^"[^"]+"/, 'STRING'],
        [/^\+/, '+'],
        [/^-/, '-'],
        [/^\*/, '*'],
        [/^\^/, '^'],
        [/^\//, '/'],
        [/^\(/, '('],
        [/^\)/, ')'],
        [/^,/, ','],
    ];
    
    #position; //position in string
    #expr;
    
    readExpr(expr) {
        this.#position = 0;
        this.#expr = expr;
    }
    
    //construct a token for next substring
    next() {
        if (this.#position == this.#expr.length) return undefined;

        const substring = this.#expr.slice(this.#position);
        for (const [pattern, type] of this.#tokens) {
            const [match] = pattern.exec(substring) || [];
            if (!match) continue;

            this.#position += match.length;
            if (type === null) return this.next();
            return { token: match, type };
        }
        
        throw new Error(`Unrecognized input: ${str[0]}`);
    }
}

module.exports = {Tokenizer}