const productsDetailDao = require("../models/products_detail_dao");

const productDetail = async (id) => {
  const [detailPage] = await productsDetailDao.getDetailPageById(id);
  const detailReview = await productsDetailDao.getDetailReviewData(id);
  const detailQuestion = await productsDetailDao.getDetailQuestionData(id);
  detailPage.detailReviews = detailReview;
  detailPage.detailQuestions = detailQuestion;

  return detailPage;
};

module.exports = { productDetail };
