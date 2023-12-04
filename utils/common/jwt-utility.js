const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")



const generateToken = async ({ ...data }, secret) => {
    const token = await jwt.sign({ ...data }, JWT_SECRET, { expiresIn: "2days" });
    return token;
}

const verifyToken = (token) => {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
}


const decodeToken = async (token) => {
    const T = await jwt.decode(token);
    return T;
}

const getToken = (req) => {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return null;
    }

    const token = authorization.split(" ")[1];
    return token;
}


module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
    getToken
}