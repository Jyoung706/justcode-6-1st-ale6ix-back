const productsDetailService = require("../services/products_detail_service");

const productsDetailController = async (req, res) => {
  const id = Number(req.params.id);
  try {
    if (id > 79) {
      res.status(400 || 500).json({ ERROR: "Not existing product" });
      return;
    }
    const productDetail = await productsDetailService.productDetail(id);

    res.status(200).json({ productDetail });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

module.exports = { productsDetailController };
