// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");

require("dotenv").config();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Set up Express Handlebars.
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
const htmlRoutes = require("./controllers/routes_controller.js");
app.use(htmlRoutes);
const userRoutes = require("./controllers/user_controller.js");
app.use(userRoutes);
const subscriptionRoutes = require("./controllers/subscription_controller.js");
app.use(subscriptionRoutes);
// const budgetRoutes = require("./controllers/budget_controller.js");
// app.use(budgetRoutes);

//require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser to view.",
      PORT,
      PORT
    );
  });
});
