const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUsername, getUserByEmail) {
    const authenticateUser = async (getUsername, password, done) => {
        const user = queryEqual('User','username', getUsername)
        if (user == []) {
            return done(null, false, {message: 'No user with that name'})
        }

        try {
            if (await bcrypt.compare(password, user[1])) {
                return done(null, user)
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
    passport.serializeUser((user,done) => done(null, user.email))
    passport.deserializeUser((email,done) => {
        return done(null, getUserByEmail(email))
    })
}

module.exports = initialize