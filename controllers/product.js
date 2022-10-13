const productRepository = require('../repository/product')

exports.getAllProduct = async (req, res) => {
    try {
        const products = await productRepository.getAllProduct()

        res.status(200).json({ message: "success", data: products })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const name_input = req.params.name
        let filtered_products = []
        const products = await productRepository.getAllProduct();
        for (let i = 0; i < products.length; i++) {
            if (((products[i].name).toLowerCase()).includes(name_input.toLowerCase())) {
                filtered_products.push(products[i])
            }
        }
        res.status(200).json({ message: "success", data: filtered_products });
    } catch (error) {
        res.status(404).json({ message: "product not found" });
    };
};