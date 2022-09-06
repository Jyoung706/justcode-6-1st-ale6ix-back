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
  "/detail/:id/review",
  validateToken.validateToken,
  reviewController.reviewCreateController
);
router.get("/detail/:id/review", reviewController.getReviewController);
router.delete(
  "/detail/:id/review",
  validateToken.validateToken,
  reviewController.reviewDeleteController
);

router.post(
  "/detail/:id/question",
  validateToken.validateToken,
  questionController.questionCreateController
);
router.get("/detail/:id/question", questionController.getQuestionController);
router.delete(
  "/detail/:id/question",
  validateToken.validateToken,
  questionController.questionDeleteController
);

module.exports = router;
