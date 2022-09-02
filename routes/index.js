const express = require("express");

const userRouter = require("./user_router");
const productRouter = require("./product_router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

module.exports = router;
