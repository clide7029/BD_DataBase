const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const test = require('./data/test');
var returnList =[[]]
var returnUsers=[[]]
var returnStockPrices =[[]]
module.exports = {
    lockOut: function(username){
        var db = new sqlite3.Database('database.db');
        let sql=`UPDATE User set lockedout = true WHERE username = ?`
        let data = [username]
        db.run(sql, data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
            
          
          });
    },

    addUser: function(username, password, email) {
        console.log("enter add to user");
        var db = new sqlite3.Database('database.db');
        // var stmt = db.prepare("INSERT INTO Portfolio VALUES ( ? , ? , ? , ? )");
        // stmt.run(username, ticker, numshares, mostrecentprice);
        // stmt.finalize();
        let lockedout=false;
        let currency=1000;
        db.serialize(() => {
            db.run(`INSERT or IGNORE INTO User(username,password,email,lockedout,currency) VALUES ("${username}","${password}","${email}",${lockedout},${currency})`, (err, row) => {
                //db.run(`INSERT or IGNORE INTO Portfolio(username,ticker,numshares,mostrecentprice) VALUES ("${username}","${ticker}",${numshares},${mostrecentprice}) UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err, row) => {
                if(err){
                throw err;/*
                    db.run(`UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err2,row2) =>{
                        if(err2) {
                            throw err2;
                        } 
                            console.log('updated instead')});
                    //throw err;*/
                }
                //console.log(row.username);
            });
        });
        db.close();
    },
    addPricing: function(ticker, day, openPrice, closePrice, highPrice,lowPrice) {
        console.log("enter add to pricing");
        var db = new sqlite3.Database('database.db');
        // var stmt = db.prepare("INSERT INTO Portfolio VALUES ( ? , ? , ? , ? )");
        // stmt.run(username, ticker, numshares, mostrecentprice);
        // stmt.finalize();
        db.serialize(() => {
            db.run(`INSERT or IGNORE INTO Pricing(ticker,day,openPrice,closePrice,highPrice,lowPrice) VALUES ("${ticker}","${day}","${openPrice}",${closePrice},${highPrice},${lowPrice})`, (err, row) => {
                //db.run(`INSERT or IGNORE INTO Portfolio(username,ticker,numshares,mostrecentprice) VALUES ("${username}","${ticker}",${numshares},${mostrecentprice}) UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err, row) => {
                if(err){
                throw err;/*
                    db.run(`UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err2,row2) =>{
                        if(err2) {
                            throw err2;
                        } 
                            console.log('updated instead')});
                    //throw err;*/
                }
                //console.log(row.username);
            });
        });
        db.close();
    },
    queryEqual: function(table, whereatt, wherevar) {
        //var returnList = [[]]
        var db = new sqlite3.Database('database.db');
        let sql = `SELECT * FROM ${table} WHERE ${whereatt} = '${wherevar}'`
        var iterator = 0
        db.each(sql,(err,row) => {
            //console.log("in db.each");
            if(err) {
                throw err;
            }
            username = row.username
            ticker = row.ticker
            numshares = row.numshares
            
            //for (var i = 0; i < 2; i++) {
                //var emptyStr = ""
                returnList[iterator] = {
                    'username' : username,
                    'ticker' : ticker,
                    'numshares' : numshares,
                }
            iterator++;
        },
        
        function(){
            //console.log("in return function");
            //console.log(returnList)
            db.close();
            returnList.splice(iterator);
            return returnList;
        }
        );
        return returnList
    },
    getUserInfo: async function(user) {
        //var returnList = [[]]
        var db = new sqlite3.Database('database.db');
        let sql = `SELECT * FROM User WHERE username = ` + "'" + user + "'"
        var userInfo;
        const row = await new Promise((resolve,reject) => {
            db.get(sql, [], (err, row) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(row)
                // console.log("row: " + row)
            }) 
        }).then(row => {
            userInfo = row
            console.log("database function return type: " + typeof(userInfo));

        })
        console.log("type of return userInfo: " + typeof(userInfo))
        return userInfo;
    },
    printAllUsers: function() {
        //var returnList = [[]]
        var db = new sqlite3.Database('database.db');
        let sql = 'SELECT * FROM User'
        var iterator = 0
        db.each(sql,(err,row) => {
            //console.log("in db.each");
            if(err) {
                throw err;
            }
            username = row.username
            password = row.password
            email = row.email
            
            //for (var i = 0; i < 2; i++) {
                //var emptyStr = ""
                returnList[iterator] = {
                    'username' : username,
                    'password' : password,
                    'email' : email
                }
            iterator++;
        },
        function(){
            //console.log("in return function");
            console.log(returnList)
            db.close();
            return returnList;
        }
        );
        console.log(":(")
        return returnList
    },
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

    },
    updateUserCurr(username,change){
        var db = new sqlite3.Database('database.db');
        let sql=`UPDATE User set currency = ? WHERE username = ?`
        let currentcurrency=this.getUserInfo(username)[0].currency;
        let newcurrency=currentcurrency+change;
        console.log("new currency = "+newcurrency)
        let data = [newcurrency,username]

        db.run(sql, data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
            
          
          });
    },
    getPortfolioInfo: function(username,ticker){
        console.log("into getPortfolioInfo");
        //this.returnUsers = [[]]
        var db = new sqlite3.Database('database.db');
        let sql = `SELECT * FROM Portfolio where username = (?) and ticker = (?)`
        var iterator = 0
        db.serialize(() => {
        db.each(sql,[username,ticker],(err,row) => {
            console.log("in db.each")
            //console.log("in db.each");
            if(err) {
                throw err;
            }
            ticker = row.ticker
            username = row.username
            numsharesSTRING = row.numshares
            var numshares=parseFloat(numsharesSTRING)
            //for (var i = 0; i < 2; i++) {
                //var emptyStr = ""
                returnUsers[iterator] = {
                    'username' : username,
                    'ticker' : ticker,
                    'numshares' : numshares,
                }
            iterator++;
        },
        
        function(){
            console.log("return users 0 ="+returnUsers[0].ticker)
            db.close();
            return returnUsers;
        }
        );
        })
        console.log("return users 2 ="+returnUsers.length)
        return returnUsers
    },
    removePortfolio: function(ticker,username){
        console.log("in remove from porfolio")
        var db = new sqlite3.Database('database.db');
        let sql=`DELETE FROM portfolio WHERE username = ? AND ticker = ?`
        let data = [username,ticker]

        db.run(sql, data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            
          
          });
    },
    updatePortfolioAmount: function(ticker,username,amount){
        var db = new sqlite3.Database('database.db');
        let sql=`UPDATE portfolio set numshares = ? WHERE username = ? AND ticker = ?`
        let port=this.getPortfolioInfo(username,ticker);
        if(port[0]==undefined){
            console.log("NO TICKER UNDEFINED")
            return "NO TICKER"
        }
        if(port[0].ticker!==ticker){
            console.log("NO TICKER")
            return "NO TICKER"
        }
        let currentshares=port[0].numshares
        let updateamount= parseFloat(amount);
        let newshares=currentshares+updateamount;
        console.log("new currency = "+newshares)
        if(newshares<0){
            return "Can't go to negative shares"
        }
        if(newshares==0){
            console.log("removing portfolio from update")
            this.removePortfolio(ticker,username);
            return "removed portfolio"
        }
        let data = [newshares,username,ticker]

        db.run(sql, data, function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
            
          
          });
    },
    addPortfolio: function(username, ticker, numshares) {
        console.log("into add portfolio")
        var db = new sqlite3.Database('database.db');
        // var stmt = db.prepare("INSERT INTO Portfolio VALUES ( ? , ? , ? , ? )");
        // stmt.run(username, ticker, numshares, mostrecentprice);
        // stmt.finalize();
        var temp = this.getPortfolioInfo(username,ticker)
        console.log("temp = "+temp[0].ticker)
        if(temp[0].ticker==ticker){
            this.updatePortfolioAmount(ticker,username,numshares)
            return
        }
        if(ticker==""||numshares==null||parseFloat(numshares)<=0){
            console.log("invalid input numshares = "+numshares+" ticker = "+ticker)
            return "invalid input"
        }
        db.serialize(() => {
            db.run(`INSERT or IGNORE INTO Portfolio(username,ticker,numshares) VALUES ("${username}","${ticker}","${numshares}")`, (err, row) => {
                //db.run(`INSERT or IGNORE INTO Portfolio(username,ticker,numshares,mostrecentprice) VALUES ("${username}","${ticker}",${numshares},${mostrecentprice}) UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err, row) => {
                if(err){
                    throw err;
                
                    // db.run(`UPDATE portfolio SET numshares = ${numshares} WHERE username = "${username}" AND ticker = "${ticker}"`, (err2,row2) =>{
                    //     if(err2) {
                    //         throw err2;
                    //     } 
                    //         console.log('updated instead')});
                    //throw err;
                }
                else{
                    console.log("added portfolio successfully")
                }
                //console.log(row.username);
            });
        });
        db.close();
    },
    getStocksSince: function(ticker, day) {
        //var returnList = [[]]
        var db = new sqlite3.Database('database.db');
        let sql = `SELECT openprice, closeprice, highprice, lowprice, day FROM Pricing where day > ? and ticker = ? ORDER BY DATE`
        let data = [day,ticker]
        var iterator = 0
        db.each(sql,data,(err,row) => {
            //console.log("in db.each");
            if(err) {
                throw err;
            }
            highPrice = row.highprice
            lowPrice = row.lowprice
            openPrice = row.openprice
            closePrice = row.closePrice
            day = row.day
            
            //for (var i = 0; i < 2; i++) {
                //var emptyStr = ""
                returnStockPrices[iterator] = {
                    'highPrice' : highPrice,
                    'lowPrice' : lowPrice,
                    'openPrice' : openPrice,
                    'closePrice' : closePrice,
                    'day' : day
                }
            iterator++;
        },
        
        function(){
            console.log("in return function for pricing");
            console.log(returnList)
            db.close();
            return returnStockPrices;
        }
        );
        return returnStockPrices
    },
};
