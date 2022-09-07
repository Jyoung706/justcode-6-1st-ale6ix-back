const productListDao = require('../models/product_list_dao')

const groupProductList = async (groupCodeId, limit, offset) => {
    const getgroupProductListCount =  await productListDao.getgroupProductListCount(groupCodeId);
    const groupProductList =  await productListDao.getgroupProductList(groupCodeId, offset, limit);
    const ByGroupcode = await productListDao.getProductDetailCategoryByGroupode(groupCodeId);
    const detailCode  = JSON.parse(ByGroupcode[0].detailCode)
    ByGroupcode[0].detailCode = detailCode
    return {productList : groupProductList, ByGroupcode: ByGroupcode[0], totalCount: getgroupProductListCount[0].totalCount} 
}

const subcategoryProductList = async (groupCodeId, detailCodeId, limit, offset) => {
    const getProductListCount =  await productListDao.getProductListCount(groupCodeId, detailCodeId);
    const ProductList =  await productListDao.getProductList(groupCodeId, detailCodeId, offset, limit);
    const ByGroupcode = await productListDao.getProductDetailCategoryByGroupode(groupCodeId);
    const detailCode  = JSON.parse(ByGroupcode[0].detailCode)
    ByGroupcode[0].detailCode = detailCode
    return {productList : ProductList, ByGroupcode: ByGroupcode[0], totalCount: getProductListCount[0].totalCount} 
}

const productSearch = async (keyword) => {
    return  await productListDao.getProductSearchList(keyword);
}

const recommendProductList = async () => {
    return  await productListDao.getRecommendProductList();
}

const newProductList = async () => {
    return  await productListDao.getNewProductList();
}

module.exports = { subcategoryProductList, groupProductList, productSearch, recommendProductList, newProductList};

