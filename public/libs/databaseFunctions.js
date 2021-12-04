function add(table, listOfVar){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var values = "";
    for(var i=0;i<listOfVar.length-1;i++){
        values+=listOfVar[i]+",";
    }
    values+=listOfVar[listOfVar.length];
    var stmt = db.prepare("INSERT INTO (?) VALUES (?)");
    stmt.run(table,values);
    stmt.finalize();
    db.close();
}
function update(table, attributes, value, wherestatment){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("UPDATE (?) SET (?)=(?) WHERE (?)");
    stmt.run(table, attributes, value, wherestatment);
    stmt.finalize();
    db.close();
}
//just a comment 
function remove(table, whereclause){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("DELETE FROM (?) WHERE (?)");
    stmt.run(table, whereclause);
    stmt.finalize();
    db.close();
}
function query(table, attribute, whereclause){
    var returnString = "";
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("SELECT (?) FROM (?) WHERE (?)");
    stmt.each(attribute, table, whereclause,function(err, row){
        returnString+=row.id+": "+row.attribute+"\n";
    }
    );
    stmt.finalize();
    db.close();
    return returnString;
}