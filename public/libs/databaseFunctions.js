function addUser(username,password,email,currency){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO User VALUES ((?),(?),(?),false,(?))");
    stmt.run(username,password,email,currency);
    stmt.finalize();
    db.close();
}
function addTicker(ticker,exchange){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO Ticker VALUES ((?),(?))");
    stmt.run(ticker,exchange);
    stmt.finalize();
    db.close();
}
function addPricing(ticker,day,openprice,closeprice){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO Pricing VALUES ((?),(?),(?),(?))");
    stmt.run(ticker,day,openprice,closeprice);
    stmt.finalize();
    db.close();
}
function addTickerReturn(ticker,day,tickerreturn){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO TickerReturn VALUES ((?),(?),(?))");
    stmt.run(ticker,day,tickerreturn);
    stmt.finalize();
    db.close();
}
function addSale(username,ticker,day,hour,boughtsold){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO Sale VALUES ((?),(?),(?),(?),(?))");
    stmt.run(username,ticker,day,hour,boughtsold);
    stmt.finalize();
    db.close();
}
function addOwned(username,ticker,numshares){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO Owned VALUES ((?),(?),(?))");
    stmt.run(username,ticker,numshares);
    stmt.finalize();
    db.close();
}
function addPortfolio(username,ticker,numshares){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt = db.prepare("INSERT INTO Portfolio VALUES ((?),(?),(?))");
    stmt.run(username,ticker,numshares);
    stmt.finalize();
    db.close();
}

function updateAt(table, attributes, value, whereatt,wherevar){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("UPDATE (?) SET (?)=(?) WHERE (?) = (?)");
    stmt.run(table, attributes, value, whereatt,wherevar);
    stmt.finalize();
    db.close();
}
function updateAt2(table, attributes, value, whereatt,wherevar, whereatt2,wherevar2){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("UPDATE (?) SET (?)=(?) WHERE (?) = (?) AND (?) = (?)");
    stmt.run(table, attributes, value, whereatt,wherevar, whereatt2,wherevar2);
    stmt.finalize();
    db.close();
}
function remove(table, whereatt,wherevar){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("DELETE FROM (?) WHERE (?)");
    stmt.run(table, whereatt,wherevar);
    stmt.finalize();
    db.close();
}

function queryEqual(table, attribute, whereatt, wherevar){
    var returnList = [];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("SELECT (?) FROM (?) WHERE (?)=(?)");
    var i=0;
    stmt.each(attribute, table, whereatt,wherevar,function(err, row){
        returnList[i]=row.attribute;
        i++;
    }
    );
    stmt.finalize();
    db.close();
    return returnList;
}
function queryEqual2(table, attribute, whereatt, wherevar,whereatt2,whereval2){
    var returnList = [];
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('.../data/database.db');
    var stmt=db.prepare("SELECT (?) FROM (?) WHERE (?)=(?) AND (?)=(?)");
    var i=0;
    stmt.each(attribute, table, whereatt,wherevar,whereatt2,whereval2,function(err, row){
        returnList[i]=row.attribute;
        i++;
    }
    );
    stmt.finalize();
    db.close();
    return returnList;
}