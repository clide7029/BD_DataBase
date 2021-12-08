var sqlite3 = require('sqlite3').verbose();
const test = require('./data/test');

module.exports = {

    createDatabase: function() {
        console.log("inside creater");
        var db = new sqlite3.Database('database.db', (err) => {
            if(err){
                console.error(err.message);
                return null;
            }
        });
            console.log("connected to db");
            db.serialize(function() {
                db.run('CREATE TABLE User(username TEXT PRIMARY KEY,password text,email text,lockedout boolean,currency DOUBLE)');
                db.run('Create table Ticker(ticker text,exchange text,PRIMARY key (ticker, exchange))');
                db.run('create table Owned(username TEXT,ticker TEXT,numshares int,PRIMARY KEY (username,ticker),FOREIGN key (username) REFERENCES User,FOREIGN key (ticker) REFERENCES Ticker)');
                db.run('create table Portfolio(username TEXT,ticker TEXT,numshares int,mostrecentprice REAL,PRIMARY KEY (username,ticker),FOREIGN key (username) REFERENCES User,FOREIGN key (ticker) REFERENCES Ticker)');
                db.run('create table Sale (username text,ticker text,day text,hour text,boughtsold int,PRIMARY key (ticker,day,hour,username),FOREIGN key (username) REFERENCES User,FOREIGN key (ticker) REFERENCES Ticker)');
                db.run('create table Pricing(ticker TEXT PRIMARY KEY,day text,openPrice double,closePrice double,highPrice double,lowPrice double,FOREIGN key (ticker) REFERENCES Ticker)');
                db.run('create table Return(ticker text PRIMARY key,day text,return text,FOREIGN key (ticker) REFERENCES Ticker)');
                });
        
        db.close();
    }
}

