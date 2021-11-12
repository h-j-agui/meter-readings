const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/admin");
  }
};

const userController = require("./controllers/user.controller");
const meterController = require("./controllers/meter.controller");
const readingController = require("./controllers/reading.controller");

//User must see this to enter PIN
router.get("/", (req, res) => {
  res.render("index.ejs");
});

//employee login
router.post("/login", passport.authenticate("employee-local"), (req, res) => {
  console.log("logging..........");
  // res.redirect("/admin/adminDash");
  res.send(req.user);
  // res.redirect("/form");
});

router.get("/checkAuth", (req, res, next) => {
  console.log(req.isAuthenticated());

  // if (req.isAuthenticated()) {
  //   next();
  // }

  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({ message: "Not Authorized" });
    // res.send({ message: "Not Authorized" });
  }
});

//for the .ejs views
router.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

router.post("/adminLogin", passport.authenticate("admin-local"), (req, res) => {
  res.send(req.user);
  // res.redirect("/admin/adminDash");
});

router.get("/logout", function (req, res) {
  req.logout();

  req.user = null;
  res.redirect("/");
});

// router.get("/form", checkAuth, (req, res) => {
//   res.render("form.ejs");
// });

//adding, editing and deleting users
router.get("/getUser", userController.getUser);
router.post("/addUser", userController.addUser);

router.put("/admin/editUser/:id", userController.editUser);

router.delete("/deleteUser/:id", userController.deleteUser);

//Meter
router.get("/admin/getMeters", meterController.getMeter);
router.post("/admin/addMeter", meterController.addMeter);

//edit and delete with admin access
router.put("/admin/meter", meterController.editMeter);
router.delete("/admin/meter/:id", meterController.deleteMeter);

//Meter-entries
router.get("/getMeterData", readingController.getReading);
router.post("/editMeterData", readingController.addReading);
router.get("/getLastReadings", readingController.getLastReadings);
router.get("/getConsumptions", readingController.getConsumption);

//why its called edit meter data? if the route is to 'add' not to edit.

//edit and delete with admin access
router.put("/admin/Reading", readingController.editReading);
router.delete("/admin/Reading/:id", readingController.deleteReading);

module.exports = router;
