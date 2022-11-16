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
        const productId_input = req.params.name;
        let filtered_products = [];
        const products = await productRepository.getAllProduct();
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(productId_input.toLowerCase())) {
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
        let data = []
        let temp_product = [];
        let id = [];
        let temp = {};
        const product = await cartRepository.getCartStatus();

        // create an array of object id and quantity
        product
            .map((x) => x.toJSON())
            .map((y) => y.cart_items.map((z) => temp_product.push(z)));

        // create an object with sum quantity which have same id
        temp_product.forEach(function (x) {
            if (temp.hasOwnProperty(x.productId)) {
                temp[x.productId] = temp[x.productId] + x.quantity;
            } else {
                temp[x.productId] = x.quantity;
            }
        });

        // transform to array
        for (let prop in temp) {
            id.push({ productId: prop, quantity: temp[prop] });
        }
        id.sort((a, b) => (b.quantity) - (a.quantity));
        id.slice(0, 5);
        let id_product = id.map(a => a.productId);
        for (let i in id_product) {
            let bestSeller = await productRepository.searchProducts(id_product[i])
            bestSeller = bestSeller[0].dataValues
            bestSeller.items_sold = id[i].quantity
            data.push(bestSeller)
        }
        data = data.sort(({ items_sold: a }, { items_sold: b }) => b - a);
        if (product) {
            return res.status(200).json({ message: "success", data: data });
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` });
    }
};
