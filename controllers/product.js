const productRepository = require("../repository/product");
const cartRepository = require("../repository/cart");

exports.getAllProduct = async (req, res) => {
    try {
        if (req.query.categoryId) {
            const products = await productRepository.getAllProductByCategory(
                req.query.categoryId
            );
            return res.status(200).json({ message: "success", data: products });
        }

        const products = await productRepository.getAllProduct();
        return res.status(200).json({ message: "success", data: products });
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const productId_input = req.params.productId;
        let filtered_products = [];
        const products = await productRepository.getAllProduct();
        for (let i = 0; i < products.length; i++) {
            if (products[i].productId.toLowerCase().includes(productId_input.toLowerCase())) {
                filtered_products.push(products[i]);
            }
        }
        if (Object.keys(filtered_products).length > 0) {
            return res
                .status(200)
                .json({ message: "success", data: filtered_products });
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
};

exports.bestProduct = async (req, res) => {
    try {
        let temp_product = [];
        let id = [];
        let temp = {};
        const product = await cartRepository.getCartStatus();

        product
            .map((x) => x.toJSON())
            .map((y) => y.cart_items.map((z) => temp_product.push(z)));

        temp_product.forEach(function (x) {
            if (temp.hasOwnProperty(x.productId)) {
                temp[x.productId] = temp[x.productId] + x.quantity;
            } else {
                temp[x.productId] = x.quantity;
            }
        });


        for (let prop in temp) {
            id.push({ productId: prop, quantity: temp[prop] });
        }
        id.sort((a, b) => (b.quantity) - (a.quantity));
        id.slice(0, 5);
        id = id.map(a => a.productId);


        const bestSeller = await productRepository.searchProducts(id)

        if (product) {
            return res.status(200).json({ message: "success", data: bestSeller });
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
};
