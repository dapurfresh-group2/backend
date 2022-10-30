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
            await cartRepository.deleteCartItem(productId)

            const cartActive = await cartRepository.findCartActive()
            const checkCartItem = await cartRepository.checkCartItemByCartID(cartActive.id)
            if (!checkCartItem) {
                await cartRepository.changeCartStatus(cartActive.id, false)
            }

            return res.status(200).json({ message: "success deleted cart item" })
        }

        const totalPrice = quantity * product.price
        
        const cartActive = await cartRepository.findCartActive()

        if (!cartActive) {
            const newCart = await cartRepository.createCart(req.user.id)

            const newCartItem = await cartRepository.addCartItem(productId, newCart.id, quantity, totalPrice)

            return res.status(200).json({ message: 'success', data: newCartItem })
        } else {
            const checkCartItem = await cartRepository.checkCartItemByProductID(productId)
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