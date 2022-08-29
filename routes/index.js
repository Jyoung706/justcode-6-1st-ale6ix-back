const express = require("express");

const userRouter = require("./userRouter");
// const productRouter = require("./productRouter");
// const otherRouter = require('./other');

const router = express.Router();

router.use("/users", userRouter);
// router.use(otherRouter);

module.exports = router;
