const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


//User Register
exports.userRegister = async (req, res) => {
    const { username, email, password, phone } = req.body
    try {
        const existingUser = await users.findOne({ email })
        const phoneNumber = await users.findOne({ phone })
        if (existingUser) {
            res.status(406).json("User already exist")
        } else if (phoneNumber) {
            res.status(406).json("Phone number already used")
        }
        else {
            const newUser = new users({
                username: username, password: password, email: email, phone: phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}



//User Login
exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.secretKey)

            res.status(200).json({ token, user: existingUser.username, userId: existingUser._id })
        } else {
            res.status(406).json("Invalid username/password")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}