const navCategoryDao = require("../models/nav_category_dao");

const navCategoryService = async () => {
  let categoryData = await navCategoryDao.getCategoryBygroupId();

  categoryData.map((data) => {
    data.smallCategories = JSON.parse(data.smallCategories);
  });
  return categoryData;
};

module.exports = { navCategoryService };
