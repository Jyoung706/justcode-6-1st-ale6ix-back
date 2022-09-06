const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource
    .initialize()
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });

const getProductDetailCategoryByGroupode = async (groupCodeId)=>{
    const ByGroupcode = await myDataSource.query(`
    SELECT gc.id
            , gc.group_code_name 
            , JSON_ARRAYAGG(
                JSON_OBJECT(
                'detailCodeId', dc.id,
                'detailCodeName', dc.detail_code_name
                )
            ) as detailCode
    
        FROM group_code gc
        JOIN detail_code dc on gc.id = dc.group_code_id 
    WHERE gc.is_active = 1
    AND dc.is_active = 1
    AND  gc.id = ?
    GROUP BY gc.id
    ;`, [groupCodeId])
    
    return ByGroupcode
}

const getProductList = async (groupCodeId, detailCodeId, offset, limit)=>{
    const ProductList = await myDataSource.query(`
    SELECT  gc.group_code_name 
            , pd.group_code_id 
            , dc.detail_code_name 
            , pd.detail_code_id 
            , pd.price 
            , pd.id 
            , pd.product_name 
            , pd.main_image_url 
        FROM products pd
        JOIN group_code gc on pd.group_code_id = gc.id 
        JOIN detail_code dc on pd.detail_code_id = dc.id 
        WHERE gc.is_active = 1
        AND dc.is_active = 1
        AND pd.group_code_id = ?
        AND pd.detail_code_id =?
        LIMIT ?, ?
    ;`, [groupCodeId, detailCodeId, offset*1, limit*1])
    
    return ProductList
}

const getProductListCount = async (groupCodeId, detailCodeId)=>{
    const ProductListCount = await myDataSource.query(`
    SELECT count(pd.id ) AS totalCount
        FROM products pd
        JOIN group_code gc on pd.group_code_id = gc.id 
        JOIN detail_code dc on pd.detail_code_id = dc.id 
        WHERE gc.is_active = 1
        AND dc.is_active = 1
        AND pd.group_code_id = ?
        AND pd.detail_code_id =?
    ;`, [groupCodeId, detailCodeId])
    
    return ProductListCount
}

const getgroupProductList = async (groupCodeId, offset, limit)=>{
    const groupProductList = await myDataSource.query(`
    SELECT  gc.group_code_name 
            , pd.group_code_id 
            , dc.detail_code_name 
            , pd.detail_code_id 
            , pd.price 
            , pd.id 
            , pd.product_name 
            , pd.main_image_url 
        FROM products pd
        JOIN group_code gc on pd.group_code_id = gc.id 
        JOIN detail_code dc on pd.detail_code_id = dc.id 
        WHERE gc.is_active = 1
        AND dc.is_active = 1
        AND pd.group_code_id = ?
        LIMIT ?, ?
    ;`, [groupCodeId, offset*1, limit*1])

    return groupProductList
}

const getgroupProductListCount = async (groupCodeId)=>{
    const groupProductListCount = await myDataSource.query(`
    SELECT  count(pd.id ) AS totalCount
        FROM products pd
        JOIN group_code gc on pd.group_code_id = gc.id 
        JOIN detail_code dc on pd.detail_code_id = dc.id 
        WHERE gc.is_active = 1
        AND dc.is_active = 1
        AND pd.group_code_id = ?
    ;`, [groupCodeId])
    
    return groupProductListCount
}

const getProductSearchList = async (keyword)=>{
    const searchProductList = await myDataSource.query(`
    SELECT gc.group_code_name 
        , pd.group_code_id 
        , dc.detail_code_name 
        , pd.detail_code_id 
        , pd.price 
        , pd.id 
        , pd.product_name 
        , pd.main_image_url 
    FROM products pd
    JOIN group_code gc on pd.group_code_id = gc.id 
    JOIN detail_code dc on pd.detail_code_id = dc.id 
    WHERE pd.product_name LIKE  CONCAT('%', ? ,'%')
    OR dc.detail_code_name LIKE  CONCAT('%', ? ,'%')
    OR gc.group_code_name  LIKE  CONCAT('%', ? ,'%')
    ;`, [keyword, keyword, keyword])
    
    return searchProductList
}

const getRecommendProductList = async ()=>{
    const RecommendProductList = await myDataSource.query(`
    SELECT gc.group_code_name 
        , pd.group_code_id 
        , dc.detail_code_name 
        , pd.detail_code_id 
        , pd.price 
        , pd.id 
        , pd.product_name 
        , pd.main_image_url 
    FROM products pd
    JOIN group_code gc on pd.group_code_id = gc.id 
    JOIN detail_code dc on pd.detail_code_id = dc.id 
    WHERE pd.recommend = 1 `)
    
    return RecommendProductList
}

const getNewProductList = async ()=>{
    const RecommendProductList = await myDataSource.query(`
    SELECT gc.group_code_name 
        , pd.group_code_id 
        , dc.detail_code_name 
        , pd.detail_code_id 
        , pd.price 
        , pd.id 
        , pd.product_name 
        , pd.main_image_url 
    FROM products pd
    JOIN group_code gc on pd.group_code_id = gc.id 
    JOIN detail_code dc on pd.detail_code_id = dc.id 
    ORDER BY pd.created_at DESC
    LIMIT 0, 14;`)
    
    return RecommendProductList
}

module.exports = { getProductList, getgroupProductList, getProductDetailCategoryByGroupode, 
    getProductSearchList, getRecommendProductList, getNewProductList, getProductListCount, getgroupProductListCount};