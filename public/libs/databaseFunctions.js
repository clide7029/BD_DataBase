function add(table, listOfVar){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var values = "";
    for(var i=0;i<listOfVar.length;i++){
        values+=listOfVar[i];
    }
    var stmt = db.prepare("INSERT INTO (?) VALUES (?)");
    stmt.run(table,values);
    stmt.finalize();
}
function update(table, attribute, value, wherestatment){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("UPDATE (?) SET (?)=(?) WHERE (?)");
    stmt.run(table, attribute, value, wherestatment);
}
function remove(table, whereclause){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("DELETE FROM (?) WHERE (?)");
    stmt.run(table, whereclause);
}