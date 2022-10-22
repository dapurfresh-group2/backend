const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const Cart = require('./cart')
const Product = require('./product')

const CartItem = sequelize.define('cart_items', {
    quantity: {
        type: DataTypes.INTEGER
    },
    total_price: {
        type: DataTypes.INTEGER
    }
})

Product.hasMany(CartItem)
CartItem.belongsTo(Product)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

module.exports = CartItem