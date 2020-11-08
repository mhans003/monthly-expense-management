const express = require("express");

const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  //res.sendFile(path.join(__dirname, "../public/signup.html"));
  res.render("index");
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  //res.sendFile(path.join(__dirname, "../public/login.html"));
  res.render("login");
});

router.get("/members", isAuthenticated, (req, res) => {
  //res.sendFile(path.join(__dirname, "../public/members.html"));
  res.render("members");
});

module.exports = router;
