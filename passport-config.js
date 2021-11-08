const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");
const Employee = require("./models/Employee");

// Authentication strategies
// Application middleware
// Sessions (optional)

passport.use(
  "employee-local",
  new LocalStrategy(function (username, password, done) {
    Employee.findOne({ where: { password: password } })
      .then((user) => {
        // console.log("Encontre un usuario", user);

        if (!user) {
          return done(null, false, { message: "Access Denied!" });
        }

        // console.log("approved", user);
        return done(null, user);
      })
      .catch((err) => {
        console.log(err);
      });
  })
);

passport.use(
  "admin-local",
  new LocalStrategy(function (username, password, done) {
    Admin.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
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
  Employee.findByPk(id)
    .then((user) => {
      console.log("found one by PK", user);
      done(null, user);
    })
    .catch((err) => console.log(err));
});

module.exports = passport;
