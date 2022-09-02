const navCategoryService = require("../services/nav_category_service");

const navCategoryController = async (req, res) => {
  const categoryData = await navCategoryService.navCategoryService();
  res.status(200).json({ categoryData });
};

module.exports = { navCategoryController };
