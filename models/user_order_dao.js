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

const getUserOrderCartList = async (user_id)=>{
    const userOrderCartList = await myDataSource.query(`
    SELECT uo.id AS user_order_id
            , uo.user_id 
            , uo.product_id 
            , uo.quantity 
            , order_status_id 
            , p.id 
            , p.price 
            , p.product_name 
            , p.main_image_url 
            , p.stock 
    FROM user_order uo 
    JOIN products p ON uo.product_id = p.id 
    WHERE uo.order_status_id = 1
    AND uo.user_id = ?
    ORDER BY uo.created_at DESC
    ;`, [user_id])
    
    return userOrderCartList
}

const getUserCartProduct = async (user_id, product_id)=>{
    const userOrderCartList = await myDataSource.query(`
        SELECT uo.product_id 
        FROM user_order uo 
        WHERE uo.order_status_id = 1
        AND uo.user_id = ?  
        AND uo.product_id = ?    
    ;`, [user_id, product_id])
    
    return userOrderCartList
}

const cartInsert = async (user_id, product_id, quantity)=>{
    const userOrderCartList = await myDataSource.query(`
    INSERT INTO user_order 
            (user_id 
            , product_id 
            , quantity 
            , order_status_id 
        ) VALUES(
            ?
            , ?
            , ?
            , 1
        )
    ;`, [user_id, product_id, quantity])
    
    return userOrderCartList
}

const cartUpdate = async (id, quantity)=>{
    const userOrderCartList = await myDataSource.query(`
    UPDATE user_order
        SET quantity  = ?
        WHERE id = ?
    ;`, [quantity, id])
    
    return userOrderCartList
}

const cartDelete = async (id)=>{
    const userOrderCartList = await myDataSource.query(`
    DELETE 
    FROM user_order
    WHERE id = ?
    AND order_status_id = 1
    ;`, [id])
    
    return userOrderCartList
}

const cartAllDelete = async (id)=>{
    const userOrderCartList = await myDataSource.query(`
    DELETE
    FROM user_order
    WHERE user_id = ?
    ;`, [id])
    
    return userOrderCartList
}

module.exports = { getUserOrderCartList, getUserCartProduct, cartInsert, cartUpdate, cartDelete, cartAllDelete };