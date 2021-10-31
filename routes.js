const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};

const adminController = require("./controllers/admin.controller");
const employeeController = require("./controllers/employee.controller");
const meterController = require("./controllers/meter.controller");
const readingController = require("./controllers/reading.controller");

//User must see this to enter PIN
router.get("/", (req, res) => {
  res.render("index.ejs");
});

//Admin must see this to enter user & pass
router.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

router.post("/admin", passport.authenticate("admin-local"), (req, res) => {
  // res.send(req.user)
  res.redirect("/admin/adminDash");
});

router.post("/logout", (req, res) => {
  req.logOut();
  console.log("logging out");
  res.sendStatus(200);
});

router.get("/form", checkAuth, (req, res) => {
  res.render("form.ejs");
});

//administrator login
router.get("/admin", adminController.getAdmin);

//adding, editing and deleting administrators and employees
router.post("/admin/addUser", employeeController.addEmployee);
router.post("/admin/addAdmin", adminController.addAdmin);

router.put("/admin/editUser/:id", employeeController.editEmployee);
router.put("/admin/editAdmin", adminController.editAdmin);

router.delete("/admin/deleteEmployee/:id", employeeController.deleteEmployee);
router.delete("/admin/deleteAdmin/:id", adminController.deleteAdmin);

//employee login
router.post("/login", passport.authenticate("employee-local"), (req, res) => {
  res.redirect("/form");
});

router.get("/getEmployees", employeeController.getEmployee);

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

//why its called edit meter data? if the route is to 'add' not to edit.

//edit and delete with admin access
router.put("/admin/Reading", readingController.editReading);
router.delete("/admin/Reading/:id", readingController.deleteReading);

module.exports = router;
