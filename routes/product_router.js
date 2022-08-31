const express = require("express");
const {
  navCategoryController,
} = require("../controllers/nav_category_controller");
const router = express.Router();

router.get("/nav_category", navCategoryController);

module.exports = router;
