// const express = require("express");

// const router = express.Router();

// Requiring our models and passport as we've configured it
// const db = require("../models");

// Route for getting some data about our user to be used client side
// router.post("/budget", (req, res) => {
//   db.Subscription.findAll({
//     attributes: [
//       "id",
//       "price",
//       [
//         sequelize.literal("COALESCE(base_income, 0) + COALESCE(user_taxes, 0)"),
//         "total_sal"
//       ]
//     ],
//     group: ["name", "name"]
//   });
// });
