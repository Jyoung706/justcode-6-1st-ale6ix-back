const userService = require('../services/user_service')
const jwt = require('jsonwebtoken')

const { AUTH_TOKEN_SALT } = process.env

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const { userId } = jwt.verify(token, 'server_made_secret_key') 
        console.log("userId : "+userId);
        const foundUser = await userService.getUserById(userId)
        if (!foundUser) 
        res.status(404).json({ message: "USER_NOT_FOUND" })
        req.foundUser = foundUser 
        next() 
    } catch (err) {
        next(err)
    }
}

module.exports = { validateToken };
