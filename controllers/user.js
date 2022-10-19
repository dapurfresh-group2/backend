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
            res.status(400).json({ message: "failed username has been used" })
            return
        }
        if (phone !== null) {
            res.status(400).json({ message: "failed phone has been used" })
            return
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10); 
        await userRepository.createUser(req.body)
        res.status(200).json({ message: "register success" })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.login = async (req, res) => {
    try {
        const username = {username : req.body.username}
        const user = await userRepository.getUser(username)
        if (user === null) {
            res.status(400).json({ message: "failed, username not registered" })
            return
        }
        let hash = bcrypt.compareSync(req.body.password, user.password);
        if (!hash) {
            res.send("incorrect password");
        }    
        const token = jwt.sign({
            data: user
        }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' })

        res.status(200).json({ message: "success", token: token })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}


