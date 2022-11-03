const cartRepository = require('../repository/cart')
const productRepository = require('../repository/product')

exports.postProduct = async (req, res) => {
    const productId = req.params.id
    const quantityBody = req.body.quantity
    const quantity = parseInt(quantityBody)

    try {
        const product = await productRepository.getProductByID(productId)
        if (!product) {
            return res.status(404).json({ message: 'failed product not found' })
        }

        if (quantity === 0) {            
            const cartActive = await cartRepository.findCartActive(req.user.id)
            await cartRepository.deleteCartItem(productId, cartActive.id)
            const checkCartItem = await cartRepository.checkCartItemByCartID(cartActive.id)
            if (!checkCartItem) {
                await cartRepository.changeCartStatus(cartActive.id, false)
            }

            return res.status(200).json({ message: "success deleted cart item" })
        }

        const totalPrice = quantity * product.price
        
        const cartActive = await cartRepository.findCartActive(req.user.id)

        if (!cartActive) {
            const newCart = await cartRepository.createCart(req.user.id)

            const newCartItem = await cartRepository.addCartItem(productId, newCart.id, quantity, totalPrice)

            return res.status(200).json({ message: 'success', data: newCartItem })
        } else {
            const checkCartItem = await cartRepository.checkCartItemByProductID(productId, cartActive.id)
            if (checkCartItem) {
                const updatedCartItem = await cartRepository.updateCartItem(productId, quantity, totalPrice)
    
                return res.status(200).json({ message: 'success', data: updatedCartItem })
            }

            const newCartItem = await cartRepository.addCartItem(productId, cartActive.id, quantity, totalPrice)

            return res.status(200).json({ message: 'success', data: newCartItem })
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}`})
    }
}

exports.getCartActive = async (req, res) => {
    try {
        const cartActive = await cartRepository.findCartActive(req.user.id)
        if (!cartActive) {
            return res.status(404).json({ message: 'cart active not found' })
        }
        let item = cartActive.cart_items
        let totalPriceFinal = 0;
        for (let i = 0; i < item.length; i++) {
            totalPriceFinal += parseInt(item[i].total_price)
        }
        cartActive.dataValues.final_price = totalPriceFinal
        return res.status(200).json({ message: "success", data: cartActive })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}`})
    }
}