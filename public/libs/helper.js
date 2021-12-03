var sqlite3 = require('sqlite3').verbose();

let testFile = "/data/database.db"
var db = new sqlite3.Database(testFile);

db.serialize("SELECT *")