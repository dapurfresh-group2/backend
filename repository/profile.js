const User = require('../models/user')

exports.updateUser = async (id, name, phone, address, image) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    user.name = name
    user.phone = phone
    user.address = address
    if (image) {
        user.image = image
    }

    user.save()

    return user
}
