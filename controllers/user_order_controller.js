const userOrderService = require('../services/user_order_service')

const userOrderCartList = async (req, res) => {
    const {id} =  req.foundUser; //users테이블에 id

    const haskey = {id:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.foundUser).forEach((keyValue) => {
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
        const userOrderCartList = await userOrderService.userOrderCartList(id);
        res.status(200).json({groupProductList : userOrderCartList , message: "success_userOrderCartList" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
} 

const userCartAdd = async (req, res) => {
    const {product_id, quantity } = req.body
    const {id} =  req.foundUser;
    if(!id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }
    
    const haskey = {product_id:false, quantity:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
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
        await userOrderService.userCartAdd(id, product_id, quantity);
        res.status(201).json({message: "success_cartInsert" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const userCartUpdate = async (req, res) => {
    const {cart_id, product_id, quantity } = req.body
    const {id} =  req.foundUser;
    if(!id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    const haskey = {cart_id:false, product_id:false, quantity:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
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
        await userOrderService.userCartUpdate(cart_id, id, product_id, quantity);
        res.status(200).json({message: "success_cartUpdate" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const userCartDelete = async (req, res) => {
    try{
        
        if(req.body.data.length ==1){
            const {cart_id, product_id} = req.body.data[0]
            console.log(req.body.data[0])
            const {id} =  req.foundUser;
            if(!id){
                res.status(400).json({ message: `user id 이/가 없습니다` })
                return;
            }
    
            const haskey = {cart_id:false, product_id:false}; 
            const requireKey = Object.keys(haskey);
    
            Object.entries(req.body.data[0]).forEach((keyValue) => {
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
                await userOrderService.userCartDelete(cart_id, id, product_id);
                res.status(200).json({message: "success_cartDelete" })
            }catch(err){
                console.log(err);
                res.status(err.statusCode || 500).json({message:err.message})
            }
        }else if(req.body.data.length > 1){
            const {id} =  req.foundUser;
            if(!id){
                res.status(400).json({ message: `user id 이/가 없습니다` })
                return;
            }
            for(let i=0; i<req.body.data.length; i++){
                const {cart_id, product_id} = req.body.data[i]
                console.log(req.body.data[i])
        
                const haskey = {cart_id:false, product_id:false}; 
                const requireKey = Object.keys(haskey);
        
                Object.entries(req.body.data[i]).forEach((keyValue) => {
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
            }

            try{
                await userOrderService.userCartMultipleDelete(req.body.data, id);
                res.status(200).json({message: "success_cartDelete" })
            }catch(err){
                console.log(err);
                res.status(err.statusCode || 500).json({message:err.message})
            }
        }
    }catch(err){
        console.log(err);
    }
    

} 


const userCartEmpty = async (req, res) => {
    const {id} =  req.foundUser; //users테이블에 id

    const haskey = {id:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.foundUser).forEach((keyValue) => {
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
        await userOrderService.userCartEmpty(id);
        res.status(200).json({message: "success_userCartEmpty" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
} 

module.exports = { userOrderCartList, userCartAdd, userCartUpdate, userCartDelete, userCartEmpty};