const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const signup = async (
  account,
  user_password,
  user_name,
  email,
  phone_number
) => {
  const salt = bcrypt.genSaltSync(10);
  user_password = bcrypt.hashSync(user_password, salt);
  const user = await userDao.createUser(
    account,
    user_password,
    user_name,
    email,
    phone_number
  );
  return user;
};

const loginUser = async (account, password) => {
  const user = await userDao.getUserByEmail(account);

  if(!user){
      const error = new Error ("LOGIN_FAIL")
      error.statusCode = 400
      throw error
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.user_password);

  if(isPasswordCorrect === false){
      const error = new Error ("LOGIN_FAIL" )
      error.statusCode = 400
      throw error
  }else if(isPasswordCorrect === true){
      // token 생성
      var token = jwt.sign({userId: user.id}, 'server_made_secret_key', { expiresIn: '1h' })
      return { message: "LOGIN_SUCCESS", token : token}
      
  }
}

const getUserById = async (user_id) => {
  const user = await userDao.getUserById(user_id);

  if(!user){
      const error = new Error ("USER_UNDEFINED")
      error.statusCode = 400
      throw error
  }
  return user
}

module.exports = { signup, loginUser, getUserById };