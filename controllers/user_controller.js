const userService = require("../services/user_service");

const accountCheck = async (req, res) => {
  const { account } = req.query;
  if (!account) {
    res.status(400 || 500).json({ message: "NO INPUT DATA" });
    return;
  }

  if (account.length > 20) {
    res.status(400 || 500).json({ ERROR: "too long account" });
    return;
  }
  try {
    await userService.accountCheck(account);
    res.status(200).json({ message: "signUp available" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message);
  }
};

const signupController = async (req, res) => {
  let { account, password, name, email, phone_number, birth } = req.body;

  if (!(account && password && name && email && phone_number)) {
    res.status(400 || 500).json({ ERROR: "CHECK NECESSARY INPUT DATA" });
    return;
  }
  if (account.length > 20) {
    res.status(400 || 500).json({ message: "too long account" });
    return;
  }
  if (password.length > 100) {
    res.status(400 || 500).json({ message: "too long password" });
    return;
  }

  if (!birth) {
    birth = null;
  }

  try {
    const userData = await userService.signup(
      account,
      password,
      name,
      email,
      phone_number,
      birth
    );

    res.status(200).json({ message: "userCreated", userData });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

const loginUser = async (req, res) => {
  const { account, password } = req.body;

  const haskey = { account: false, password: false };
  const requireKey = Object.keys(haskey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      haskey[key] = true;
    }
  });
  const haskeyArray = Object.entries(haskey);
  for (let i = 0; i < haskeyArray.length; i++) {
    const [key, value] = haskeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다` });
      return;
    }
  }

  try {
    const result = await userService.loginUser(account, password);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { accountCheck, signupController, loginUser };
