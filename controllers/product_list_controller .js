const productListService = require('../services/product_list_service')

const productList = async (req, res) => {
    const {groupCodeId, detailCodeId} = req.query
    let {limit, offset} = req.query

    if(detailCodeId){
        const haskey = {groupCodeId:false, detailCodeId:false, limit:false, offset:false}; 
        const requireKey = Object.keys(haskey);

        Object.entries(req.query).forEach((keyValue) => {
        const [key, value] = keyValue;
        if (requireKey.includes(key) && value){
            haskey[key] = true;
        }
        })
        const haskeyArray = Object.entries(haskey);
        for(let i =0; i<haskeyArray.length;i++){
        const [key, value] = haskeyArray[i];
        if(!value){
            res.status(400).json({ message: `${key} 이/가 없습니다` })
            return;
        }
        }

        try{
            const subcategoryProductList = await productListService.subcategoryProductList(groupCodeId, detailCodeId, limit, offset);
            res.status(200).json({productList : subcategoryProductList , message: "success_subcategoryProductList" })
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    }else if(!detailCodeId){
        const haskey = {groupCodeId:false, limit:false, offset:false}; 
        const requireKey = Object.keys(haskey);

        Object.entries(req.query).forEach((keyValue) => {
        const [key, value] = keyValue;
        if (requireKey.includes(key) && value){
            haskey[key] = true;
        }
        })
        const haskeyArray = Object.entries(haskey);
        for(let i =0; i<haskeyArray.length;i++){
        const [key, value] = haskeyArray[i];
        if(!value){
            res.status(400).json({ message: `${key} 이/가 없습니다` })
            return;
        }
        }

        try{
            const groupProductList = await productListService.groupProductList(groupCodeId, limit, offset);
            res.status(200).json({productList : groupProductList , message: "success_groupProductList" })
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    }
}

const productSearch = async (req, res) => {
    const {keyword} = req.query
    const haskey = {keyword:false}; // 배열이 아닌 객체로 해주는 이유는 객체는 순서대로 값이 나열되지 않는다
    const requireKey = Object.keys(haskey);

    Object.entries(req.query).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key} 이/가 없습니다` })
        return;
    }
    }

    try{
        const result = await productListService.productSearch(keyword);
        res.status(200).json({productSearchList : result , message: "readProductSearchList" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

}

const recommendProductList = async (req, res) => {
    try{
        const result = await productListService.recommendProductList();
        res.status(200).json({recommendProductList : result , message: "readRecommendProductList" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

}

const newProductList = async (req, res) => {
    try{
        const result = await productListService.newProductList();
        res.status(200).json({newProductList : result , message: "readNewProductList" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

}

module.exports = { productList, productSearch, recommendProductList, newProductList };