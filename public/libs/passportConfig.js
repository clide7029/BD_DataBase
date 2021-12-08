const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const dbfunc = require("../libs/databaseFunctions")

function initialize(passport, getUsername, getUserByEmail) {
    const authenticateUser = async (getUsername, password, done) => {
        const user = await dbfunc.getUserInfo(getUsername)
        //console.log("user: " + user.username)
        if (typeof(user) === undefined) {
            return done(null, false, {message: 'No user with that name'})
        }
        try {
            if (bcrypt.compare(password, user.password)) {
                return done(null, user.username)
            } 
            else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } 
        catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user,done) => done(null, user[0]))
    passport.deserializeUser((user,done) => {
        return done(null, user[0])
    })
}

module.exports = initialize