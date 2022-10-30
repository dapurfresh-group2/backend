const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

exports.findCartActive = async () => {
    const cartActive = await Cart.findOne({
        where: {
            status: true
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

exports.checkCartItemByProductID = async (productID) => {
    const cartItem = await CartItem.findOne({
        where: {
            productId: productID
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

exports.updateCartItem = async (productID, quantity, totalPrice) => {
    const cartItem = await CartItem.findOne({
        where: {
            productId: productID
        }
    })

    cartItem.quantity = quantity
    cartItem.total_price = totalPrice

    cartItem.save()

    return cartItem
}

exports.deleteCartItem = async (productID) => {
    await CartItem.destroy({
        where: {
            productId: productID
        }
    })

    return
}