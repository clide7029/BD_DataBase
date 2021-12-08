const myMod = require('../libs/dataGenerator');

var express = require('express'),
    router = express.Router();

var userRoutes = require('./userRoutes');

router
    .get('/', function(req, res) {
        console.log("r.js home function")
        res.render("home.ejs", {loggedIn: checkAuthenticated(req), username: req.user})
    })

    // .post('/', function(req, res) {

    //     res.render("home.ejs", search);
    // })

    // .post('/search', function(req, res){
    //     res.render("profile.ejs")
    // })
    .post('/candlestickGraph', async function(req,res) {

        //console.log('here')
        //console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
        console.log(req.body.CurrentStock);
        let obj = await myMod.generateChart(req.body.CurrentStock, req.body.range);
        //console.log(obj);
        //chart = myMod.makeChart(obj);
        res.render('home.ejs',{profile: false, loggedIn: checkAuthenticated(req), username: req.user, candleStickPrices: obj, CurrentStock: req.body.CurrentStock, IntervalChosen : IntervalChosen,IntervalDates : IntervalDates});
    
    })
    // app.get('/',function(req,res) {
    //     res.render(__dirname + '/views/candlestickGraph.ejs');
    // })

.use('/userRoutes', userRoutes);

function searchFunc(req, res){
    res.render("profile.ejs")
}

checkAuthenticated = function(req) {
    if (typeof(req.user) === "undefined") {
        return false
    }
    else {
        return true
    }
}


module.exports = router;