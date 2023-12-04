const router = require("express").Router();
const userRouter = require("./user");
const notesRouter = require("./notes")
const verifyUserAuth = require("../../middlewares/auth-middleware");


router.use("/notes", verifyUserAuth, notesRouter);
router.use("/users", userRouter);


module.exports = router