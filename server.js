const express = require("express");

const homeRoutes = require("./routes");
const adminRoutes = require("./adminRoutes");
const models = require("./models/index");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("./passport-config");
const app = express();

app.set("view-engine", "ejs");
app.use(cors(corsOptions));
const checkAuth = (req, res, next) => {
  console.log("req.user", req.user);

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/admin");
};

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "secret" }));

app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use("/", homeRoutes);
app.use("/admin", checkAuth, adminRoutes); //checkAuth

const port = 8080;

models.db
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server was started on port ${port}`);
    });
  });
