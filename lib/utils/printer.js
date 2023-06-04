'use strict'

class Printer {
    #reset =  '\x1b[0m'
    #red =    '\x1b[31m'
    #yellow = '\x1b[33m'
    #green =  '\x1b[32m'

    print(data) {
        console.log(data);
    }

    printError(status) {
        this.printRed("Error: ", status);
        this.print("");
    }

    printResult(result) {
        this.printGreen("Result: ", result);
        this.print("");
    }

    printRed(topic, data = "") {
        console.log(this.#red + topic + this.#reset + data);
    }

    printYellow(topic, data = "") {
        console.log(this.#yellow + topic + this.#reset + data);
    }

    printGreen(topic, data = "") {
        console.log(this.#green + topic + this.#reset + data);
    }
}

module.exports = {Printer}
