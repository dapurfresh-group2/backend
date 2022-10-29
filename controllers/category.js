const categoryRepository = require('../repository/category')

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await categoryRepository.getAllCategory()

        return res.status(200).json({ message: "success", data: categories })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}`})
    }
}