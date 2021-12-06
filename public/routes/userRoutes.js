var express = require('express'),
    router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const initializePassport = require('../libs/passportConfig')
const userHandler = require('../libs/userHandling')
const dbfunc = require('../libs/databaseFunctions')
const profile = require('../libs/profileListeners');

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false })); 
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// const u = dbfunc.queryEqual('User', 'username', 'username', user.username);
// const e = dbfunc.queryEqual('User', 'email', 'email', user.email);
// initializePassport(passport, u, e) //Select from table instead of users remove id make sure username is unique

router.get('/', function(req, res, next) {
    res.send('users route');
});


router.get('/', checkAuthenticated, (req, res) => {
    res.render('home.ejs', { name: req.user.username }) //if we want to display username on homepage
})
router.get('/userLogin', checkNotAuthenticated, (req, res) => {
    res.render('userLogin.ejs')
})

router.get('/userCreation', checkNotAuthenticated, (req, res) => {
    res.render('userCreation.ejs')
})

router.post('/userLogin', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/userLogin',
    failureFlash: true
}))
router.post('/userCreation', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        addUser(username, password, email, 1000) //implement email into register
        res.redirect('/userLogin')
    } catch {
        res.redirect('/userCreation')
    }
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/userLogin')
})


router.get('/userProfile', (req, res) => {

    res.render("profile.ejs", { port: [["this was a get req"]] });
    // profile.addRowHandlers(Document);
})

router.post('/userProfile', async function(req, res) {
    // let mostrecentprice = dbfunc.currentStockPrice(req.body.tickerID)
    let mostrecentprice = 0;
    console.log(`ticker = ${ req.body.tickerID }`);
    console.log(`shares = ${ req.body.shares }`);
    console.log(`price = ${ mostrecentprice }`);
    if(typeof(req.body.tickerID) !== 'undefined') {
        console.log("adding portfolio");
        dbfunc.addPortfolio("Dumbuser",req.body.tickerID, req.body.shares,mostrecentprice);
        console.log("portfolio added");
    }
    let port = dbfunc.queryEqual('portfolio','username','Dumbuser');

    console.log(port)
    res.render("profile.ejs", { port: port , name: req.body.tickerID });
    // profile.addRowHandlers(Document);
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/userLogin')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
// app.listen(3000)


//Check strategy tab thingy

module.exports = router;