'use strict'

const fs = require('fs')
const {DataBase} = require('../lib/db/db.js');
const db = new DataBase();

test('write-read funcs', () => {
    db.start();

    db.write('a', 1)
    db.write('b', 2)
    expect(db.read('a')).toEqual(1);
    expect(db.read('b')).toEqual(2);
    expect(db.read('c')).toEqual(false);
    

    db.finish();
    db.clearAfterTest();
})

test('clear func', () => {
    db.start();

    db.write('a', 1)
    db.write('b', 2)
    db.clear()
    expect(db.read('a')).toEqual(false);
    expect(db.read('b')).toEqual(false);
    
    db.finish();
    db.clearAfterTest();
})

test('checkFile func', () => {
    db.clearAfterTest();
    db.start();
    db.finish();
    const path = './lib/db/storage/storage.json';
    const exists = fs.existsSync(path)
    expect(exists).toEqual(true);

    db.clearAfterTest();
})

test('repair func', () => {
    const path = './lib/db/storage/storage.json';
    const backup_path = './lib/db/storage/backup-storage.json'

    db.start();
    db.finish();

    fs.appendFileSync(path, '{');

    db.start();
    db.finish();

    
    const exists = fs.existsSync(backup_path)
    expect(exists).toEqual(true);

    db.clearAfterTest();
})