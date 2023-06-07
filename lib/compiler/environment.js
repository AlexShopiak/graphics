'use strict'

class Environment {
    #fields;
    #parent;

    constructor(fields, parent) {
        this.#fields = fields;
        this.#parent = parent;
    }

    lookup(ident) {
        if (ident in this.#fields) {
            return this.#fields[ident];
        }
        if (this.#parent) {
            return this.#parent.lookup(ident);
        }
        throw new Error(`Unspecified identifier "${ident}"`);
    }
}

module.exports = {Environment}