'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Toping.belongsToMany(models.Transaction, {
        as: "transactions",
        through: {model: "ProductToping"}
      })

      Toping.belongsToMany(models.Product, {
        as: "topings",
        through: {model: "ProductToping"}
      })
    }
  };
  Toping.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Toping',
  });
  return Toping;
};