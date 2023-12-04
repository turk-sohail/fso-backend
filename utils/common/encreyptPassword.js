const bcrypt = require("bcrypt");
const config = require("../config");


const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
    return hash;
}

const verifyHash = async (password, hash) => {
    const verfied = await bcrypt.compare(password, hash);
    if (!verfied) {
        return false
    }
    return true
}



module.exports = {
    generateHash,
    verifyHash
}