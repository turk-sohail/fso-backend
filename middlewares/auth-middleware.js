const { StatusCodes } = require("http-status-codes");
const { JWT, ErrorResponse } = require("../utils/common");


const verifyUserAuth = async (req, res, next) => {
    const jwtToken = await JWT.getToken(req);
    const user = await JWT.decodeToken(jwtToken);
    const userID = user.data.id;
    if (!jwtToken) {
        ErrorResponse.message = "please login to continue";
        return res.status(StatusCodes.FORBIDDEN).json(ErrorResponse);
    }
    if (!userID) {
        ErrorResponse.message = "you are not authorized";
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    next();
}

module.exports = verifyUserAuth;