const { Sequelize } = require('sequelize')
require('dotenv').config()

// Ini sebenernya gak ada masalah, cuma kalau bisa
// kalau mau one line seperti ini, tiap value dimasukin
// ke variabel aja, jadi misal
// const dbUser = process.env.DB_USER
// biar lebih readable
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

module.exports = sequelize