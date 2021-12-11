const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const dbfunc = require("../libs/databaseFunctions")

var failedLogin = {};

function initialize(passport, getUsername, getUserByEmail) {
    const authenticateUser = async (getUsername, password, done) => {
        const user = await dbfunc.getUserInfo(getUsername)
        //console.log("user: " + user.username)
        if (typeof(user) === 'undefined') {
            return done(null, false, {message: 'No user with that name'})
        }
        if(failedLogin[user.username] >= 5){
            console.log("you shouldn't be here!");
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user.username)
            } 
            else {
                if(failedLogin[user.username] === 'undefined'){
                    failedLogin[user.username] = 0;
                } else {
                failedLogin[user.username] += 1;
            }
                return done(null, false, {message: 'Password incorrect'})
            }
        } 
        catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user,done) => done(null, user))
    passport.deserializeUser((user,done) => {
        return done(null, user)
    })
}

module.exports = initialize