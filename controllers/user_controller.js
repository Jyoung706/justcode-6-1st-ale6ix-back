const userService = require("../services/user_service");

const signupController = async (req, res) => {
  let { account, user_password, user_name, email, phone_number } = req.body;

  if (!(account && user_password && user_name && email && phone_number)) {
    res.status(400).json({ ERROR: "CHECK INPUT DATA" });
    return;
  }

  try {
    await userService.signup(
      account,
      user_password,
      user_name,
      email,
      phone_number
    );

    res.status(200).json({ message: "userCreated" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

module.exports = { signupController };
