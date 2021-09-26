const Admin = require('./controllers/admin.controller');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function usePassport(passport) {


    const authenticateUser = async (username, password, done) => {


        const user = Admin.findOneAdmin({username});

        if (user == null) {
            return done(null, false, { message: 'No user with that name'})
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password'})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.serializeUser((id, done) => { 
        done(null, user.id)
    })
}
module.exports =  usePassport;