const { DataTypes } = require('sequelize');
const db = require('../config/index');
const Category = require('./category')

const Product = db.define('products', {
  name: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  weight: {
    type: DataTypes.STRING
  },
  info: {
    type: DataTypes.STRING
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = Product;