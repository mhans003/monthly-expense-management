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
  // db.Subscription.create({
  //   budget: req.body.budget
  // });
  //First add up the total expenses to be sent over.
  db.Subscription.findAll({
    attributes: [
      [db.sequelize.fn("sum", db.sequelize.col("price")), "expenses"]
    ],
    group: ["UserId"]
  }).then(dbPost => {
    console.log("DbPost: " + dbPost);
    //Next, get all subscriptions to be sent over.
    db.Subscription.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(allSubscriptions => {
      console.log("allSubscriptions: " + allSubscriptions);
      res.render("budget", { subscriptions: allSubscriptions, budget: dbPost });
    });
  });
});

module.exports = router;
