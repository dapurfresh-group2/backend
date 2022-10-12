const { DataTypes } = require('sequelize');
const db = require('../config/index');

const Product = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: {
    type: DataTypes.INTEGER
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

Product.sync();

module.exports = Product;