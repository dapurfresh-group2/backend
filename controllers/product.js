const productRepository = require('../repository/product')

exports.getAllProduct = async (req, res) => {
    try {
        if (req.query.categoryId) {
            const products = await productRepository.getAllProductByCategory(req.query.categoryId)
            return res.status(200).json({ message: "success", data: products })
        }

        const products = await productRepository.getAllProduct()
        return res.status(200).json({ message: "success", data: products })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` })
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
        if (Object.keys(filtered_products).length > 0) {
            return res.status(200).json({ message: "success", data: filtered_products });
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    };
};