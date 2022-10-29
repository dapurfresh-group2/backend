const { Sequelize } = require('sequelize')
require('dotenv').config()
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env

// Ini sebenernya gak ada masalah, cuma kalau bisa
// kalau mau one line seperti ini, tiap value dimasukin
// ke variabel aja, jadi misal
// const dbUser = process.env.DB_USER
// biar lebih readable
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres'
});

module.exports = sequelize