const express = require("express");

const router = express.Router();

const db = require("../models");

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
  //Each time this route is rendered, we want to access ALL subscriptions from the current
  //user who is logged in via req.user. Then, these are passed as an array to subscription.handlebars
  //This will pass the subscription information to the handlebars page to be rendered.

  //Grab all subscriptions that match the logged in user.
  //Pass them over in the res.render method. res.render("subscriptoin", { subscriptions: subscriptions })
  db.Subscription.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(result => {
    console.log(result);
    res.render("subscription", { subscriptions: result });
  });
});

module.exports = router;
