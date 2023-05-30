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
        return expr;
    }

    validateExpr = expr => {
        const unit = '(([0-9]+(\\.[0-9]+)?)|[x])'  //number or 'x'
        const mask = '^'+unit+'([\\+\\-\\*\\/\\^]'+unit+')*'+'$';
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
        const mask = '^[\\-]?([0-9]+(\\.[0-9]+)?)$' //number
        if (value.match(mask) != null) return 'valid'
        return "error-msg"
    }

    hasVariable = expr => expr.includes('x');
}

module.exports = {Validator}