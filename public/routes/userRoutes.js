
const express = require('express')
const passport = require('passport')
var router = express.Router();

const bcrypt = require('bcrypt')

const dbfunc = require('../libs/databaseFunctions')
const myMod = require('../libs/dataGenerator')

router.get('/2', (req, res) => {
    res.render('home.ejs', {loggedIn: checkAuthenticated(req), username: req.user}) //if we want to display username on homepage
})
router.get('/userLogin', (req, res) => {
    if((!checkAuthenticated(req)) || typeof(checkAuthenticated(req)) === 'undefined') {
        res.render('userLogin.ejs')
    }
    else {
        res.redirect('/userRoutes/2')
    }
})

router.get('/userCreation', (req, res) => {
    if(!checkAuthenticated(req) || typeof(checkAuthenticated(req)) === 'undefined') {
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
        var user = await dbfunc.getUserInfo(req.body.username)
        if(typeof(user) === 'undefined') {
            console.log("create new user")
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            dbfunc.addUser(req.body.username, hashedPassword, req.body.email) //implement email into register
            // req.app.locals.isAuth = checkAuthenticated(req);
            // console.log('updating auth' + req.app.locals.isAuth)
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
    if(!checkAuthenticated(req)){
        res.redirect('/');
    }
    // let mostrecentprice = dbfunc.currentStockPrice(req.body.CurrentStock)
    let mostrecentprice = 0;
    console.log(`ticker = ${ req.body.CurrentStock }`);
    console.log(`shares = ${ req.body.shares }`);
    console.log(`price = ${ mostrecentprice }`);
    if(typeof(req.body.CurrentStock) !== 'undefined') {
        console.log(req.body.CurrentStock)

        let olo = await dbfunc.getPortfolioInfo(req.user,req.body.CurrentStock)
        console.log(olo[0].ticker+"   :olo")
        if(olo[0].ticker==req.body.CurrentStock){
            console.log("updating")
            dbfunc.updatePortfolioAmount(req.body.CurrentStock,req.user,req.body.shares);
        }
        else{
            console.log(olo[0].numshares)
            console.log("adding")
            dbfunc.addPortfolio(req.user,req.body.CurrentStock, req.body.shares,mostrecentprice);
        }
    }
    console.log("getting portfolio for " + req.user);
    let port = dbfunc.queryEqual('Portfolio','username',req.user);
    //console.log(port)
    res.render("profile.ejs", { port: port, loggedIn: checkAuthenticated(req), username: req.user});
})

router.post('/userProfile/candlestickGraph', async function(req,res) {
    if(!checkAuthenticated(req)){
        res.redirect('/');
    }
    //console.log('here')
    //console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
    let obj = await myMod.generateChart(req.body.CurrentStock, req.body.range);
    let port = dbfunc.queryEqual('portfolio','username',req.user);

    //chart = myMod.makeChart(obj);
    res.render('profile.ejs',{profile: true, loggedIn: checkAuthenticated(req), username: req.user, port: port, candleStickPrices: obj, CurrentStock: req.body.CurrentStock, IntervalChosen : IntervalChosen,IntervalDates : IntervalDates});

})


function checkAuthenticated(req) {
    if (typeof(req.user) === "undefined") {
        return false
    }
    else {
        return true
    }
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