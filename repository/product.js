const Product = require('../models/product')
const Category = require('../models/category')

exports.getAllProduct = async () => {
    const products = await Product.findAll({ include: Category })

    return products
}

exports.getProductByID = async (id) => {
    const product = await Product.findOne({
        where: {
            id: id
        }
    })

    return product
}