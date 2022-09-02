const reviewDao = require("../models/review_Dao");

const reviewCreateService = async (user_id, product_id, title, content) => {
  return await reviewDao.createReview(user_id, product_id, title, content);
};

const reviewDelete = async (id, user_id) => {
  await reviewDao.reviewDelete(id, user_id);
};
module.exports = { reviewCreateService, reviewDelete };
