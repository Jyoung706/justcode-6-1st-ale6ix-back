const express = require("express");
const {
  navCategoryController,
} = require("../controllers/nav_category_controller");
const {
  productsDetailController,
} = require("../controllers/products_detail_controller");

const {
  reviewCreateController,
  reviewDeleteController,
} = require("../controllers/review_controller");

const router = express.Router();

router.get("/nav_category", navCategoryController);
router.get("/detail/:id", productsDetailController);
router.post("/reviews", reviewCreateController);
router.delete("/reviews", reviewDeleteController);

module.exports = router;
