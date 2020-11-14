// const db = require(".");

// Creating our subscription model
module.exports = function(sequelize, DataTypes) {
  const Subscription = sequelize.define("Subscription", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false
      //   validate later
      //   validate:{

      //   }
      //   feature to edit amount paid per subscription
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    withdrawalDate: {
      //Change this to a date type; Adjust client-side user date selection.
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  // Subscription.associate = function(models) {
  //   models.Subscription.belongsTo(models.User);
  // };
  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Subscription.totalExpense = () => {
  //   Subscription.findAll({
  //     attributes: [[sequelize.fn("sum", sequelize.col("price")), "total"]],
  //     group: ["UserId"]
  //   });
  //   console.log("expenses being calculated");
  // };
  // console.log(Subscription.totalExpense());
  return Subscription;
};
