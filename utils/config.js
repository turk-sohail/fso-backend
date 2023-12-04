require('dotenv').config();

const PORT = process.env.PORT;
const DB_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

module.exports = {
  PORT,
  DB_URI,
  JWT_SECRET,
  SALT_ROUNDS
};
