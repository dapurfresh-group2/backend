const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const userRepository = require('../repository/user')
const profileRepository = require('../repository/profile')
require('dotenv').config()

exports.getProfile = async (req, res) => {
    try {
        const dataId = {id : req.user.id}
        const user = await userRepository.getUser(dataId)
        if (user === null){
            return res.status(400).json({ message: "username not registered" })
        }
        return res.status(200).json({ message: "success", data: user })
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const dataId = {id : req.user.id}
        const user = await userRepository.getUser(dataId)
        if (user === null) {
            return res.status(400).json({ message: "username not registered" })
        }
        const {name, phone, address} = req.body
        if (!req.files) {
            const updatedProfile = await profileRepository.updateUser(dataId.id, name, phone, address)
            return res.status(200).json({ message: "success",data: updatedProfile })
        } 
        else {
            const file = req.files.file
            const path = `/images/profile/${req.user.username}.jpg`
            file.mv("./public" + path)
            const updatedProfile = await profileRepository.updateUser(dataId.id, name, phone, address, "/static" + path)
            return res.status(200).json({ message: "success",data: updatedProfile })
        }
    } catch (error) {
        return res.status(400).json({ message: `failed ${error.message}` })
    }
}


