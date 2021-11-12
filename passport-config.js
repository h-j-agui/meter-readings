const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("./models/User");

// Authentication strategies
// Application middleware
// Sessions (optional)

passport.use(
  "employee-local",
  new LocalStrategy(function (username, password, done) {
    User.findOne({ where: { password: password } })
      .then((user) => {
        // console.log("Encontre un usuario", user);

        if (!user) {
          return done(null, false, { message: "Access Denied!" });
        }

        console.log("attempting admin login", user);
        return done(null, user);
      })

      .catch((err) => {
        console.log(err);
      });
  })
);

passport.use(
  "admin-local", //hannah,    12345
  new LocalStrategy(function (username, password, done) {
    //hannah
    User.findOne({ where: { username: username } })

      //theuser from the db. {id:1, username: hannah, password:ha$3d}
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        //12345   +  3($#*(#))       ha$3d
        bcrypt.hash(password, user.salt).then((hash) => {
          //   ha$3d;           ha$3d
          if (user.password !== hash) {
            return done(null, false, { message: "Incorrect password." });
          }
          console.log("attempting admin login", user);
          return done(null, user);
        });
      })

      .catch((err) => {
        console.log(err);
      });
  })
);

passport.serializeUser(function (user, done) {
  console.log("serializando", user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializing employee by id", id);
  User.findByPk(id)
    .then((user) => {
      console.log("found one by PK", user);
      done(null, user);
    })
    .catch((err) => console.log(err));
});

module.exports = passport;
