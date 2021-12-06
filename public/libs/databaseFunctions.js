const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const test = require('./data/test');
module.exports = {
    // addUser: function(username, password, email, currency) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO User VALUES (?,?,?,false,?)");
    //     stmt.run(username, password, email, currency);
    //     stmt.finalize();
    //     db.close();
    // },
    // addTicker: function(ticker, exchange) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO Ticker VALUES (?,?)");
    //     stmt.run(ticker, exchange);
    //     stmt.finalize();
    //     db.close();
    // },
    // addPricing: function(ticker, day, openprice, closeprice) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO Pricing VALUES (?,?,?,?)");
    //     stmt.run(ticker, day, openprice, closeprice);
    //     stmt.finalize();
    //     db.close();
    // },
    // addTickerReturn: function(ticker, day, tickerreturn) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO TickerReturn VALUES (?,?,?)");
    //     stmt.run(ticker, day, tickerreturn);
    //     stmt.finalize();
    //     db.close();
    // },
    // addSale: function(username, ticker, day, hour, boughtsold) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO Sale VALUES (?,?,?,?,?)");
    //     stmt.run(username, ticker, day, hour, boughtsold);
    //     stmt.finalize();
    //     db.close();
    // },
    // addOwned: function(username, ticker, numshares) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("INSERT INTO Owned VALUES (?,?,?)");
    //     stmt.run(username, ticker, numshares);
    //     stmt.finalize();
    //     db.close();
    // },
    addPortfolio: function(username, ticker, numshares, mostrecentprice) {
        var db = new sqlite3.Database('database.db');
        // var stmt = db.prepare("INSERT INTO Portfolio VALUES ( ? , ? , ? , ? )");
        // stmt.run(username, ticker, numshares, mostrecentprice);
        // stmt.finalize();
        db.serialize(() => {
            db.run(`INSERT INTO Portfolio(username,ticker,numshares,mostrecentprice) VALUES ("${username}","${ticker}","${numshares}","${mostrecentprice}")`, (err, row) => {
                if(err){
                    throw err;
                }
                console.log(row.username);
            });
        });
        db.close();
    },
    // updateAt: function(table, attributes, value, whereatt, wherevar) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("UPDATE ? SET ? = ? WHERE ? = ?");
    //     stmt.run(table, attributes, value, whereatt, wherevar);
    //     stmt.finalize();
    //     db.close();
    // },
    // updateAt2: function(table, attributes, value, whereatt, wherevar, whereatt2, wherevar2) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("UPDATE ? SET ? = ? WHERE ? = ? AND ? = ?");
    //     stmt.run(table, attributes, value, whereatt, wherevar, whereatt2, wherevar2);
    //     stmt.finalize();
    //     db.close();
    // },
    // remove: function(table, whereatt, wherevar) {
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("DELETE FROM ? WHERE ?");
    //     stmt.run(table, whereatt, wherevar);
    //     stmt.finalize();
    //     db.close();
    // },
    queryEqual: function(table, whereatt, wherevar) {
        var returnList = [];
        var db = new sqlite3.Database('database.db');
        // var stmt = db.prepare("SELECT * FROM ? WHERE ? = ?");
        // var i = 0;
        // stmt.each(table, whereatt, wherevar, function(err, row) {
        //     returnList[i] = row;
        //     i++;
        // });

        db.serialize(() => {
            db.each(`SELECT username FROM User`, (err, row) => {
                if(err){
                    throw err;
                }
                console.log(row.username);
                returnList[i] = row;
                i++;
            });
        });

        // stmt.finalize();
        db.close();
        return returnList;
    },
    // queryEqual2: function(table, attribute, whereatt, wherevar, whereatt2, whereval2) {
    //     var returnList = [];
    //     var db = new sqlite3.Database('database.db');
    //     var stmt = db.prepare("SELECT ? FROM ? WHERE ?=? AND ?=?");
    //     var i = 0;
    //     stmt.each(attribute, table, whereatt, wherevar, whereatt2, whereval2, function(err, row) {
    //         returnList[i] = row.attribute;
    //         i++;
    //     });
    //     stmt.finalize();
    //     db.close();
    //     return returnList;
    // },

    // getUserByEmail: function(email) {
    //     return queryEqual('User', 'email', 'email', email);
    // },

    currentStockPrice: async function(ticker) {


        console.log("inside get price")
        try {
            const data = await axios.get(`https://finnhub.io/api/v1/quote?symbol=TSLA`, {headers: {
                'X-Finnhub-Token': 'c6im5hiad3i8jt9dugng'
            }});
            console.log("before json")
            var currPrice = JSON.parse(data.data).c;
            console.log(`price = ${currPrice}`);
        }
        catch(err) {
            console.log("axios error")
            console.error(err);
        }

        if(typeof(currPrice) !== Number ){
            return 0;
        }else {
            return currPrice;
        }

    }

};