const express = require("express");
const productListController = require("../controllers/product_list_controller ");
const userOrderController = require("../controllers/user_order_controller");
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

// 상품리스트 / 검색 API
router.get("/List", productListController.productList); 
router.get("/search", productListController.productSearch);

// 메인 신상품/추천 목록 리스트
router.get("/recommendList", productListController.recommendProductList);
router.get("/newList", productListController.newProductList);

// 유저 account 별 user_order 테이블
router.get("/cart", validateToken.validateToken, userOrderController.userOrderCartList);
router.post("/cart", validateToken.validateToken, userOrderController.userCartAdd);
router.patch("/cart", validateToken.validateToken, userOrderController.userCartUpdate);
router.delete("/cart", validateToken.validateToken, userOrderController.userCartDelete);
router.delete("/cart/all", validateToken.validateToken, userOrderController.userCartEmpty);

module.exports = router;
