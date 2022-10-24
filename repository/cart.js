const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

exports.findCartActive = async () => {
    cartActive = await Cart.findOne({
        where: {
            status: true
        }
    })

    return cartActive
}

exports.createCart = async (userID) => {
    newCart = await Cart.create({
        UserId: userID
    })

    return newCart
}

exports.addCartItem = async (productID, cartID, quantity, totalPrice) => {
    newCartItem = await CartItem.create({
        productId: productID,
        cartId: cartID,
        quantity: quantity,
        total_price: totalPrice
    })

    return newCartItem
}