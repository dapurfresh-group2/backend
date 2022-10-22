const { DataTypes } = require("sequelize")
const sequelize = require('../config')
const User = require('./user')
const Cart = require('./cart')

const Order = sequelize.define('order', {
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    note: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    Date: {
        type: DataTypes.DATE
    },
    total_product_price: {
        type: DataTypes.INTEGER
    },
    shipping_price: {
        type: DataTypes.INTEGER
    },
    total_price: {
        type: DataTypes.INTEGER
    }
})

User.hasMany(Order)
Order.belongsTo(User)

Cart.hasOne(Order)
Order.belongsTo(Cart)

module.exports = Order