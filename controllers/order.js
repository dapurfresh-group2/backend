const orderRepository = require('../repository/order')
const cartRepository = require('../repository/cart')

exports.checkout = async (req, res) => {
    const cartID = req.params.cartId
    const {
        name, 
        phone, 
        address, 
        note, 
        totalProductPrice, 
        shippingPrice, 
        totalPrice
    } = req.body
    
    try {
        const newOrder = await orderRepository.createOrder(
            req.user.id,
            cartID,
            name,
            phone,
            address,
            note,
            totalProductPrice,
            shippingPrice,
            totalPrice
        )

        await cartRepository.changeCartStatus(cartID, false)
        
        return res.status(200).json({ message: "success", data: newOrder })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
}

exports.history = async (req, res) => {
    try {
        const dataId = req.user.id
        const history = await orderRepository.getHistory(dataId)
        return res.status(200).json({ message: "success", data: history })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const dataId = req.user.id
        const orderId = req.params.orderId
        const history = await orderRepository.cancelOrder(dataId, orderId)
        return res.status(200).json({ message: "success", data: history })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
}

exports.getDetailOrder = async (req, res) => {
    const orderID = req.params.orderId

    try {
        const order = await orderRepository.getDetailOrder(orderID, req.user.id)
        if (!order) {
            return res.status(404).json({ message: "failed order not found" })
        }

        return res.status(200).json({ message: "success", data: order })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
}