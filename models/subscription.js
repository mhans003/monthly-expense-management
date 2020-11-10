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
    }
  });
  // Subscription.associate = function(models) {
  //   models.Subscription.belongsTo(models.User);
  // };
  return Subscription;
};
