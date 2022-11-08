const productRepository = require('../repository/product')
const cartRepository = require('../repository/cart')

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

exports.bestProduct = async (req, res) => {
    try {
        let id = []
        const product = await cartRepository.getCartStatus();
        function getMax(data, n) {
            var tmp = {}, tops = [];
            data.forEach(function(item) {
                tmp[item] = tmp[item] ? tmp[item]+1 : 1;
            });
            tops = Object.keys(tmp).sort(function(a, b) { return tmp[a] - tmp[b] });
            return tops.slice(-(n)).reverse();
        }
        product.map(x => (x.toJSON())).map(y => (y.cart_items).map( z => (id.push(z.productId))))
        const bestSeller = await productRepository.searchProducts(getMax(id, 5))

        if (bestSeller) {
            return res.status(200).json({ message: "success", data: bestSeller });
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
         return res.status(400).json({ message: `failed ${error.message}` });
    }
}