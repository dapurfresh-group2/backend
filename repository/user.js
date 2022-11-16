const User = require('../models/user')

exports.getUser = async(data) => {
    const user = await User.findOne({
        where: data
    })

    if (user) {
        return user
    } else {
        return null
    }
}

exports.getUserByPhone = async (phone) => {
    const referral = await User.findOne({
        where: {
            phone: phone
        }
    })

    if (referral) {
        return true
    } else {
        return false
    }
}

exports.createUser = async (req) => {
    await User.create(req)
}

exports.updateOTP = async (user, newOTP) => {
    user.otp = newOTP
    await user.save()
}