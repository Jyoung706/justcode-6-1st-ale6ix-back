const productsDetailService = require("../services/products_detail_service");

const productsDetailController = async (req, res) => {
  const { groupCode, detailCode } = req.query;
  const id = req.params.id;
  try {
    const productDetail = await productsDetailService.productDetail(
      groupCode,
      detailCode,
      id
    );
    res.status(200).json({ productDetail });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { productsDetailController };
