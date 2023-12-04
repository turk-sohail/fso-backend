const router = require('express').Router();
const { UserController, AuthController } = require("../../controllers");
const { User } = require('../../models');
const { JWT } = require("../../utils/common");

router.route('/').post(UserController.createUser).get(UserController.getAllUsers);

router.route("/login").post(AuthController.login);

module.exports = router;
