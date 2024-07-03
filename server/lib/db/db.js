'use strict'
const fs = require('fs')

class DataBase {
    #obj = {};
    #path = './lib/db/storage/storage.json';
    #backup_path = './lib/db/storage/backup-storage.json'

    #checkFile() {
        if (!fs.existsSync(this.#path)) {
            this.#createStorage();
        }
        try {
            const jsonString = fs.readFileSync(this.#path, "utf8");
            JSON.parse(jsonString);
        } catch (err) {
            this.#repairStorage();
        }
    }

    #createStorage() {
        try {
            fs.appendFileSync(this.#path, '{}',);
        } catch (err) {
            console.error(err);
        } 
    }

    #repairStorage() {
        try {
            if (fs.existsSync(this.#backup_path)) {
                fs.unlinkSync(this.#backup_path);
            }
            fs.renameSync(this.#path, this.#backup_path);
            fs.appendFileSync(this.#path, '{}');
        } catch (err) {
            console.error(err);
        } 
    }

    start() {
        this.#checkFile();
        try {
            const jsonString = fs.readFileSync(this.#path, "utf8");
            this.#obj = JSON.parse(jsonString);
            console.log("DB opened");
        } catch (err) {
            console.error(err);
        }    
    }

    finish() {
        const json = JSON.stringify(this.#obj);
        try {
            fs.writeFileSync(this.#path, json);
        } catch (err) {
            console.error(err);
        }
    }

    read(expr) {
        const exist = this.#obj.hasOwnProperty(expr);
        if (exist) {
            return this.#obj[expr];
        }
        return false;
    }

    write(expr, ast) {
        this.#obj[expr] = ast;
    }

    clear() {
        this.#obj = {};
    }

    clearAfterTest = () => {
        //For test only
        try {
            if (fs.existsSync(this.#path)) {
                fs.unlinkSync(this.#path);
            }
            if (fs.existsSync(this.#backup_path)) {
                fs.unlinkSync(this.#backup_path);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = {DataBase}