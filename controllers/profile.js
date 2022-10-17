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
            res.status(400).json({ message: "username not registered" })
            return
        }
        res.status(200).json({ message: "success", data: user })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const dataId = {id : req.user.id}
        const user = await userRepository.getUser(dataId)
        if (user === null) {
            res.status(400).json({ message: "username not registered" })
            return
        }
        const {name, phone, address, image} = req.body
        const updatedProfile = await profileRepository.updateUser(dataId.id, name, phone, address, image)
        
        res.status(200).json({ message: "success",data: updatedProfile })
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}


