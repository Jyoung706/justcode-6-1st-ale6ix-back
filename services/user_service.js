const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountCheck = async (account) => {
  await userDao.getAccountData(account);
};

const signup = async (account, password, name, email, phone_number, birth) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  await userDao.createUser(account, password, name, email, phone_number, birth);

  const userData = await userDao.getUserData(account);
  return userData;
};

const loginUser = async (account, password) => {
  const user = await userDao.getUserByEmail(account);

  if (!user) {
    const error = new Error("LOGIN_FAIL");
    error.statusCode = 400;
    throw error;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.user_password);

  if (isPasswordCorrect === false) {
    const error = new Error("LOGIN_FAIL");
    error.statusCode = 400;
    throw error;
  } else if (isPasswordCorrect === true) {
    // token 생성
    var token = jwt.sign({ userId: user.id }, "server_made_secret_key", {
      expiresIn: "3h",
    });
    return { message: "LOGIN_SUCCESS", token: token };
  }
};

const getUserById = async (user_id) => {
  const user = await userDao.getUserById(user_id);

  if (!user) {
    const error = new Error("USER_UNDEFINED");
    error.statusCode = 400;
    throw error;
  }
  return user;
};

const user = async (user_id) => {
  const user = await userDao.getUser(user_id);
  if(!user){
      const error = new Error ("USER_UNDEFINED")
      error.statusCode = 400
      throw error
  }
  // 장바구니 수량
  const getUserOrderCartCount = await userDao.getUserOrderCartCount(user_id);
  user.cartCount=getUserOrderCartCount[0].count
  return user
}

module.exports = { accountCheck, signup, loginUser, getUserById, user };
