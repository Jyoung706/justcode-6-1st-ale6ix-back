const productsDetailDao = require("../models/products_detail_dao");

const productDetail = async (groupCode, detailCode, id) => {
  return await productsDetailDao.getProductDetailById(
    groupCode,
    detailCode,
    id
  );
};

module.exports = { productDetail };
