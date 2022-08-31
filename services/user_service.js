const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");

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

module.exports = { signup };
