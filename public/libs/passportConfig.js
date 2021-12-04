const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUsername, getUserByEmail) {
    const authenticateUser = async (username, password, done) => {
        const user = getUsername(username)[0]
        if (user == null) {
            return done(null, false, {message: 'No user with that name'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
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