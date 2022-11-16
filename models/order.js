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
        type: DataTypes.STRING,
        defaultValue: "Proses"
    },
    total_product_price: {
        type: DataTypes.STRING
    },
    shipping_price: {
        type: DataTypes.STRING
    },
    total_price: {
        type: DataTypes.STRING
    }
})

User.hasMany(Order)
Order.belongsTo(User)

Cart.hasOne(Order)
Order.belongsTo(Cart)

module.exports = Order