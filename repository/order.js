const Order = require('../models/order')

exports.createOrder = async (
        userID, 
        cartID, 
        name, 
        phone, 
        address, 
        note,
        totalProductPrice,
        shippingPrice,
        totalPrice
    ) => {
    const newOrder = await Order.create({
        UserId: userID,
        cartId: cartID,
        name: name,
        phone: phone,
        address: address,
        note: note,
        total_product_price: totalProductPrice,
        shipping_price: shippingPrice,
        total_price: totalPrice
    })

    return newOrder
}