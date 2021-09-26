const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Admin = require('./models/Admin');


// Authentication strategies
// Application middleware
// Sessions (optional)

passport.use(new LocalStrategy(
    function(username, password, done) {
        Admin.findOne({ where: { username: username }})
        .then((user) => {
            if(!user) {
                return done(null, false, { message: 'User not found.' });
            }
            if(user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
));
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         Admin.findOne({ where: { username: username }})
//         .then((user) => {
//             if(!user) {
//                 return done(null, false, { message: 'User not found.' });
//             }
//             if(user.password !== password) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
        
//     }
// ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    Admin.findByPk(id)
    .then((user) => {
        done(null, user)
    })
    .catch(err => console.log(err))
  });

  module.exports = passport;