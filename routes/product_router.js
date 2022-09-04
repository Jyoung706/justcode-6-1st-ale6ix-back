const express = require("express");
const {
  navCategoryController,
} = require("../controllers/nav_category_controller");
const {
  productsDetailController,
} = require("../controllers/products_detail_controller");

const reviewController = require("../controllers/review_controller");

const questionController = require("../controllers/questionController");

const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.get("/nav_category", navCategoryController);
router.get("/detail/:id", productsDetailController);
router.post(
  "/reviews",
  validateToken.validateToken,
  reviewController.reviewCreateController
);
router.delete(
  "/reviews",
  validateToken.validateToken,
  reviewController.reviewDeleteController
);
router.post(
  "/questions",
  validateToken.validateToken,
  questionController.questionCreateController
);
router.delete(
  "/questions",
  validateToken.validateToken,
  questionController.questionDeleteController
);

module.exports = router;
