// Creating our subscription model
// may not need this model, since we are just grabbing from the subscription table
module.exports = function(sequelize, DataTypes) {
  const Budget = sequelize.define("Budget", {
    totalExpense: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  Budget.associate = function(models) {
    Budget.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Budget;
};
