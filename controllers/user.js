const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const userRepository = require('../repository/user')
require('dotenv').config()

exports.register = async (req, res) => {
    try {
        const user = await userRepository.getUserByName(req.body.username)
        const phone = await userRepository.getUserByPhone(toString(req.body.phone))
        if (user !== null) {
            res.status(400).json({ message: "failed username has been used" })
            return
        }
        if (phone !== null) {
            res.status(400).json({ message: "failed phone has been used" })
            return
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10); 
        const newUser = await userRepository.createUser(req.body)
        res.status(200).json({ message: "register success", data: newUser })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await userRepository.getUserByName(req.body.username)
        if (user === null) {
            res.status(400).json({ message: "failed username not registered" })
            return
        }
        let hash = bcrypt.compareSync(req.body.password, user.password);
        if (!hash) {
            res.send("incorrect password");
        }
        
        const token = jwt.sign({
            data: user
        }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' })

        res.status(200).json({ message: "success",data: user, token: token })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.verificationOTP = async (req, res) => {
    const phone = req.body.phone
    const otp = parseInt(req.body.otp)

    try {
        const user = await userRepository.getUser(phone)
        if (user === null) {
            res.status(400).json({ message: "failed phone number not registered" })
            return
        }

        if (user.otp !== otp) {
            res.status(400).json({ message: "failed otp does not match" })
            return
        }

        const token = jwt.sign({
            data: user
        }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' })

        res.status(200).json({ message: "success verification otp match", token: token})
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })  
    }
}
