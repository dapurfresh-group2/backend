const User = require('../models/user')

exports.updateUser = async (id, name, phone, address) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    user.name = name
    user.phone = phone
    user.address = address

    user.save()

    return user
}
