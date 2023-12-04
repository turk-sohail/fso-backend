const { Bcrypt, ErrorResponse, JWT } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { response } = require("../app");

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isValid = await Bcrypt.verifyHash(password, user.passwordHash);

    if (!username || !isValid) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            error: 'invalid username or password'
        })
    }
    const token = await JWT.getToken(req).split(" ")[2];//2
    const decoded = await JWT.decodeToken(token)
    if (!decoded.data.id) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "token invalid" })
    }
    const validUser = await User.findById(decoded.data.id);


}

module.exports = {
    login
}