const express = require("express");
const user_controller = require("../controllers/user_controller");

const router = express.Router();

router.post("/signup", user_controller.signupController);
router.post("/login", user_controller.loginUser);

module.exports = router;
