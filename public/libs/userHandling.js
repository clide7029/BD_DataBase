if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
}

const express = require('express')
const app = express()
const bcrypt = required('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passportConfig')
initializePassport(passport, username => queryEqual('User', 'username', 'username', user.username), queryEqual('User', 'email', 'email', user.email)) //Select from table instead of users remove id make sure username is unique

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req,res) => {
    res.render('home.ejs') //, {name: req.user.username}) if we want to display username on homepage
})
app.get('/userLogin', checkNotAuthenticated, (req, res) => {
    res.render('userLogin.ejs')
})

app.get('/userCreation', checkNotAuthenticated, (req, res) => {
    res.render('userCreation.ejs')
})

app.post('/userLogin', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/userLogin',
    failureFlash: true
}))
app.post('/userCreation', checkNotAuthenticated, async, (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        add('User', [username, password, email, False, 1000]) //implement email into register
        res.redirect('/userLogin')
    } catch {
        res.redirect('/userCreation')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/userLogin')
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
app.listen(3000)


//Check strategy tab thingy