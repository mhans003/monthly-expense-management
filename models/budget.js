// Creating our subscription model
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
