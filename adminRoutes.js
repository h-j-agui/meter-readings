const express = require("express");
const router = express.Router();

router.get("/adminDash", (req, res) => {
  res.render("adminDash.ejs");
});

router.get("/addUser", (req, res) => {
  res.render("addUser.ejs");
});
router.get("/addAdmin", (req, res) => {
  res.render("addAdmin.ejs");
});
router.get("/addLocation", (req, res) => {
  res.render("addLocation.ejs");
});

module.exports = router;
