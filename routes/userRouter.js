const express = require("express");
const { signupController } = require("../usersControllers/userController");

const router = express.Router();

router.post("/signup", signupController);

module.exports = router;
