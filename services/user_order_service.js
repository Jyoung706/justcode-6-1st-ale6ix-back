const userOrderDao = require('../models/user_order_dao')

const userOrderCartList = async (user_id) => {
    return  await userOrderDao.getUserOrderCartList(user_id);
} 

const userCartAdd = async (user_id, product_id, quantity) => {
    const isProductExist =  await userOrderDao.getUserCartProduct(user_id, product_id);
    console.log(isProductExist);
    if(isProductExist.length!=0){
        const error = new Error ("PRODUCT_IN_THE_SHOPPINGCART")
        error.statusCode = 400
        throw error
    }
    await userOrderDao.cartInsert(user_id, product_id, quantity);
} 

const userCartUpdate = async (id, user_id, product_id, quantity ) => {
    const isProductExist =  await userOrderDao.getUserCartProduct(user_id, product_id);
    if(isProductExist.length === 0){
        const error = new Error ("NON-EXISTENT_PRODUCT")
        error.statusCode = 400
        throw error
    }
    await userOrderDao.cartUpdate(id, quantity);
} 

const userCartDelete = async (id, user_id, product_id) => {
    const isProductExist =  await userOrderDao.getUserCartProduct(user_id, product_id);
    if(isProductExist.length === 0){
        const error = new Error ("NON-EXISTENT_PRODUCT")
        error.statusCode = 400
        throw error
    }
    await userOrderDao.cartDelete(id);
} 

const userCartMultipleDelete = async (data, user_id) => {
    for(let i=0; i<data.length; i++){
        const {cart_id, product_id} = data[i]
        const isProductExist =  await userOrderDao.getUserCartProduct(user_id, product_id);
        if(isProductExist.length === 0){
            const error = new Error ("NON-EXISTENT_PRODUCT")
            error.statusCode = 400
            throw error
        }
        await userOrderDao.cartDelete(cart_id);
    }
} 

const userCartEmpty = async (user_id) => {
    await userOrderDao.cartAllDelete(user_id);
} 

module.exports = { userOrderCartList, userCartAdd, userCartUpdate, userCartDelete, userCartMultipleDelete, userCartEmpty };