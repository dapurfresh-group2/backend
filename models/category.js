const { DataTypes } = require('sequelize');
const db = require('../config/index');

const Category = db.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
});

module.exports = Category;