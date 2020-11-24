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
      withdrawalDateOutput: req.body.withdrawalDateOutput,
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

//Update the subscription by taking in all the information from the update form. End the request so that the page subscription.handlebars can reload.
router.put("/api/subscription", (req, res) => {
  console.log(req.body.price);
  console.log(req.body.frequency);
  console.log(req.body.category);
  console.log(req.body.withdrawalDate);
  console.log(req.body.withdrawalDateOutput);
  console.log(req.body.id);
  db.Subscription.update(
    {
      price: req.body.price,
      frequency: req.body.frequency,
      category: req.body.category,
      withdrawalDate: req.body.withdrawalDate,
      withdrawalDateOutput: req.body.withdrawalDateOutput
    },
    {
      where: {
        id: req.body.id
      }
    }
  )
    .then(result => {
      console.log(`Updated ${result}`);
      res.end();
    })
    .catch(err => {
      res.status(401).json(err);
      console.log(err);
    });
});

//Delete the subscription using the id of the subscription, sent over by the button for that subscription card.
router.delete("/api/subscription", (req, res) => {
  //console.log("id clicked was " + JSON.stringify(req.body));
  console.log(req.body.id);
  db.Subscription.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      console.log(`Deleted ${result}`);
      //End the request so that location.reload will run in then block of ajax request in susbscription.js
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
