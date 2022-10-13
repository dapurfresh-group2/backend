const productRepository = require('../repository/product')

exports.getAllProduct = async (req, res) => {
    try {
        const products = await productRepository.getAllProduct()

        res.status(200).json({ message: "success", data: products })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}
