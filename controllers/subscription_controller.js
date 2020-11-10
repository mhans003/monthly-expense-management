const express = require("express");

const router = express.Router();

// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");
// const subscription = require("../models/subscription");

router.get("/api/subscription", (req, res) => {
  if (req.user) {
    console.log(req.user);
    //Find all subscriptions for this user
    db.User.findAll({
      include: db.Subscription,
      where: {
        id: req.user.id
      }
    }).then(data => {
      console.log(data);
      res.render("members");
    });
  } else {
    res.redirect("/");
  }
});

router.post("/api/subscription", req => {
  db.Subscription.create(
    ["name", "price", "frequency", "category"],
    [req.body.name, req.body.price, req.body.frequency, req.body.category],
    result => {
      console.log(result);
    }
  );
});
module.exports = router;
