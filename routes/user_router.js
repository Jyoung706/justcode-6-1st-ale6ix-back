const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

router.get("/signup", userController.accountCheck);
router.post("/signup", userController.signupController);
router.post("/login", userController.loginUser);

module.exports = router;
