const { DataTypes } = require('sequelize');
const db = require('../config/index');
const Category = require('./category')

const Product = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  Price: {
    type: DataTypes.STRING
  }
});

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = Product;