const express = require("express");

const router = express.Router();

// Requiring our models and passport as we've configured it
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
//const isAuthenticated = require("../config/middleware/isAuthenticated");
//const passport = require("../config/passport");
// const subscription = require("../models/subscription");

router.post("/api/subscription", (req, res) => {
  const userId = Number(req.user.id);
  db.Subscription.create(
    {
      name: req.body.name,
      price: req.body.price,
      frequency: req.body.frequency,
      category: req.body.category,
      withdrawalDate: req.body.withdrawalDate,
      UserId: userId
    },
    //Do we use include here? Cannot set userId directoly with req.user.id
    //,
    {
      include: db.User
    }
  )
    .then(() => {
      console.log("in then block of post route");
      //res.redirect("/");
      res.end();
    })
    .catch(err => {
      res.status(401).json(err);
      console.log(err);
    });
});

router.get("/budget", (req, res) => {
  //Each time this route is rendered, we want to access the budget from the current
  //user who is logged in via req.user. Then, these are passed as an array to budget.handlebars
  //This will pass the budget information to the handlebars page to be rendered.
  console.log("in budget route");
  console.log(db.Subscription.totalExpense());
  // }).then(result => {
  //   console.log(result);
  //   res.render("budget", { subscriptions: result });
  // });
});

module.exports = router;
