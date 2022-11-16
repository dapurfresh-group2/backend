const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const userRepository = require('../repository/user')
require('dotenv').config()

exports.register = async (req, res) => {
    try {
        const dataUser = {username : req.body.username}
        const dataPhone = {phone : toString(req.body.phone)}
        const user = await userRepository.getUser(dataUser)
        const phone = await userRepository.getUser(dataPhone)
        if (user !== null) {
            return res.status(400).json({ message: "failed username has been used" })
        }
        if (phone !== null) {
            return res.status(400).json({ message: "failed phone has been used" })
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10); 
        await userRepository.createUser(req.body)
        return res.status(200).json({ message: "register success" })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.login = async (req, res) => {
    try {
        const username = {username : req.body.username}
        const user = await userRepository.getUser(username)
        if (user === null) {
            return res.status(400).json({ message: "failed, username not registered" })
        }
        let hash = bcrypt.compareSync(req.body.password, user.password);
        if (!hash) {
            return res.send("incorrect password");
        }    
        const token = jwt.sign({
            data: user
        }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' })

        return res.status(200).json({ message: "success", token: token })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` })
    }
}


