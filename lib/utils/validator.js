'use strict'

class Validator {

    normaliseExpr = expr => {
        expr = expr.replaceAll(" ","");
        if (expr.slice(0, 1) == '-' ) {
            expr = '0' + expr;
        }
        if (expr.slice(0, 1) == '+' ) {
            expr = expr.slice(1);
        }
        expr = expr.replace(/[-+*/^]/g, ' $& ');
        return expr;
    }

    //Not in use now
    validateExpr = expr => {
        const mask = /^((\d+(\.\d+)?)|[x])(\s[\+\-\*\/\^]\s((\d+(\.\d+)?)|[x]))*$/;
        if (expr.match(mask) != null) return 'valid';
        return "error-msg";
    }

    normaliseValue = value => {
        value = value.replaceAll(" ","");
        if (value.slice(0, 1) == '+' ) {
            value = value.slice(1);
        }
        return value;
    }

    validateValue = value => {
        const mask = /^\-?\d+(\.\d+)?$/;
        if (value.match(mask) != null) return 'valid'
        return "Invalid value"
    }
}

module.exports = {Validator}