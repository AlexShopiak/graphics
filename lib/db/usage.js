const {DataBase} = require('./db.js'); 
const db = new DataBase()


db.start()
db.write("af", 898)
db.finish()