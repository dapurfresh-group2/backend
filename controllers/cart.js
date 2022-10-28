const cartRepository = require('../repository/cart')
const productRepository = require('../repository/product')

exports.addProduct = async (req, res) => {
    const productId = req.params.id
    const quantity = req.body.quantity

    try {
        const product = await productRepository.getProductByID(productId)
        if (!product) {
            res.status(404).json({ message: 'failed product not found' })
        }

        const totalPrice = quantity * product.price
        
        const cartActive = await cartRepository.findCartActive()

        if (!cartActive) {
            newCart = await cartRepository.createCart(req.user.id)

            newCartItem = await cartRepository.addCartItem(productId, newCart.id, quantity, totalPrice)

            res.status(200).json({ message: 'success', data: newCartItem })
            return
        } else {
            newCartItem = await cartRepository.addCartItem(productId, cartActive.id, quantity, totalPrice)

            res.status(200).json({ message: 'success', data: newCartItem })
            return
        }
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}`})
    }
}