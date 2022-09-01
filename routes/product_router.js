const express = require("express");
const {
  navCategoryController,
} = require("../controllers/nav_category_controller");
const {
  productsDetailController,
} = require("../controllers/products_detail_controller");

const router = express.Router();

router.get("/nav_category", navCategoryController);
router.get("/detail/:id", productsDetailController);

module.exports = router;
