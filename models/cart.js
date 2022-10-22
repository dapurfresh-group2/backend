const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const User = require('./user')

const Cart = sequelize.define('cart', {
    staus: {
        type: DataTypes.BOOLEAN
    }
})

User.hasMany(Cart)
Cart.belongsTo(User)

module.exports = Cart