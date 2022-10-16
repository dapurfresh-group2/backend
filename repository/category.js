const Category = require('../models/category')

exports.getAllCategory = async () => {
    const categories = await Category.findAll()

    return categories
}