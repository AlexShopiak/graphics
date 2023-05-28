'use strict'

class Validator {

    normaliseExpr = expr => { //todo
        expr = expr.replaceAll(" ","");
        if (expr.slice(0, 1) == '-' ) {
            expr = '0' + expr;
        }
        if (expr.slice(0, 1) == '+' ) {
            expr = expr.slice(1);
        }
        return expr;
    }

    validateExpr = expr => {//todo
        const mask = "^(\d+(/.\d+)?)([/+/*///^/-](\d+(/.\d+)?))*$" //(num)(num,sign)*
        const status = expr.match(mask) != null;
        if (status) {
            return 'valid';
        }
        return "error-msg";
    }

    validateValue = value => {//todo
        //return "error-msg"
        return "valid";
    }

    searchVariable = expr => {//todo
        //return 'null';
        return 'x';
    }
}

module.exports = {Validator}