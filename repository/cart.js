const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')
const Product = require('../models/product')
const { Sequelize } = require("sequelize");
const Order = require('../models/order');


exports.findCartActive = async (userID) => {
    const cartActive = await Cart.findOne({
        where: {
            status: true,
            UserId: userID
        },
        include: {
            model: CartItem,
            attributes: ["productId", "quantity", "total_price"],
            required: false,
            include: {
                model: Product,
                attributes: ["name"],
                required: false
            }
        }
    })
    return cartActive
}

exports.checkCartItemByCartID = async (cartID) => {
    const cartItem = await CartItem.findOne({
        where: {
            cartId: cartID
        }
    })

    if (cartItem) {
        return true
    } else {
        return false
    }
}

exports.checkCartItemByProductID = async (productID, cartID) => {
    const cartItem = await CartItem.findOne({
        where: {
            productId: productID,
            cartId: cartID
        }
    })

    if (cartItem) {
        return true
    } else {
        return false
    }
}

exports.changeCartStatus = async (cartID, status) => {
    const cart = await Cart.findOne({
        where: {
            id: cartID
        }
    })

    cart.status = status

    cart.save()

    return cart
}

exports.createCart = async (userID) => {
    const newCart = await Cart.create({
        UserId: userID
    })

    return newCart
}

exports.addCartItem = async (productID, cartID, quantity, totalPrice) => {
    const newCartItem = await CartItem.create({
        productId: productID,
        cartId: cartID,
        quantity: quantity,
        total_price: totalPrice
    })

    return newCartItem
}

exports.updateCartItem = async (productID, quantity, totalPrice, cartID) => {
    const cartItem = await CartItem.findOne({
        where: {
            productId: productID,
            cartId: cartID
        }
    })

    cartItem.quantity = quantity
    cartItem.total_price = totalPrice

    cartItem.save()

    return cartItem
}

exports.deleteCartItem = async (productID, cartID) => {
    await CartItem.destroy({
        where: {
            productId: productID,
            cartId: cartID
        }
    })

    return
}

exports.getCartStatus = async () => {
    const bestSeller = await Cart.findAll({
        attributes: [],
        include: {
            model: CartItem,
            attributes: ['productId'],
        },
        where: {
            status : 'false'
        },
    })


    return bestSeller
}

