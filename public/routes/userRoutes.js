
const express = require('express')
const passport = require('passport')
var router = express.Router();

const bcrypt = require('bcrypt')

const dbfunc = require('../libs/databaseFunctions')

router.get('/2', (req, res) => {
    console.log("home authenticated?: " + checkAuthenticated(req))
    res.render('home.ejs', {loggedIn: checkAuthenticated(req)}) //if we want to display username on homepage
})
router.get('/userLogin', (req, res) => {
    console.log("login authenticated?: " + checkAuthenticated(req))
    if(!checkAuthenticated(req)) {
        res.render('userLogin.ejs')
    }
    else {
        res.redirect('/userRoutes/2')
    }
})

router.get('/userCreation', (req, res) => {
    if(!checkAuthenticated(req)) {
        res.render('userCreation.ejs')
    }
    else {
        res.redirect('/userRoutes/2')
    }
})

router.post('/userLogin', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/userRoutes/2',
    failureRedirect: '/userRoutes/userLogin',
    failureFlash: true
})(req, res, next)
})

router.post('/userCreation', async(req, res) => {
    try {
        //check username not taken
        var user = dbfunc.getUserInfo(req.body.username)
        console.log(typeof(user));
        if(typeof(user) === 'undefined') {
            console.log("create new user")
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            dbfunc.addUser(req.body.username, hashedPassword, req.body.email) //implement email into register
            res.redirect('/userRoutes/userLogin')
        }
        else {
            res.redirect('/userRoutes/userCreation')
        }
    } catch {
        res.redirect('/userRoutes/userCreation')
    }
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/userRoutes/userLogin')
})


// router.get('/userProfile', (req, res) => {
//     // res.render("profile.ejs", { port: [["this was a get req"]] });
//     res.redirect(307, './userProfile');
//     // profile.addRowHandlers(Document);
// })

router.post('/userProfile', async function(req, res) {
    // let mostrecentprice = dbfunc.currentStockPrice(req.body.tickerID)
    let mostrecentprice = 0;
    console.log(`ticker = ${ req.body.tickerID }`);
    console.log(`shares = ${ req.body.shares }`);
    console.log(`price = ${ mostrecentprice }`);
    if(typeof(req.body.tickerID) !== 'undefined') {
        console.log("adding portfolio");
        // dbfunc.addPortfolio("Dumbuser",req.body.tickerID, req.body.shares,mostrecentprice);
        console.log("portfolio added");
    }
    let port = dbfunc.queryEqual('portfolio','username','Dumbuser');

    console.log(port)
    res.render("profile.ejs", { port: port});
})

router.post('/userProfile/candlestickGraph', async function(req,res) {

    //console.log('here')
    //console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
    console.log(req.body.CurrentStock);
    let obj = await myMod.generateChart(req.body.CurrentStock, req.body.range);
    console.log(req.body.CurrentStock);
    //chart = myMod.makeChart(obj);
    res.render('profile.ejs',{profile: true, candleStickPrices: obj, CurrentStock: req.body.CurrentStock, IntervalChosen : IntervalChosen,IntervalDates : IntervalDates});

})


function checkAuthenticated(req) {
    console.log("in check not authenticated: " + typeof(req.user))
    if (typeof(req.user) === "undefined") {
        return false
    }
    else {
        return true
    }
}

module.exports = router;