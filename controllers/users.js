const { Note, User } = require("../models");
const { StatusCodes } = require("http-status-codes")
const { SucessResponse, ErrorResponse, Bcrypt, JWT } = require("../utils/common");

const createUser = async (req, res) => {
  try {
    const { passwordHash, name, username } = req.body;

    const password = await Bcrypt.generateHash(passwordHash);

    const user = new User({ username, name, passwordHash: password });
    const token = await JWT.generateToken(user);
    console.log(token);
    await user.save();
    SucessResponse.status = StatusCodes.CREATED;
    SucessResponse.data = user;
    return res.json(SucessResponse);
  } catch (error) {
    throw ErrorResponse.error = error;
  }



};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    SucessResponse.status = StatusCodes.OK
    SucessResponse.data = users;
    return res.json(SucessResponse);
  } catch (error) {
    throw error;
  }


};

module.exports = {
  createUser,
  getAllUsers,
};
