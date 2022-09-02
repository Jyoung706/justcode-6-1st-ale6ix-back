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

const loginUser = async (req, res) => {
  const {account, password} = req.body

  const haskey = {account:false, password:false};
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
      res.status(400).json({ message: `${key}이/가 없습니다` })
      return;
  }
  }

  try{
      const result = await userService.loginUser(account, password);
      res.status(201).json({ message: result})
  }catch(err){
      console.log(err)
      res.status(err.statusCode || 500).json({message:err.message})
  }
  
}


module.exports = { signupController, loginUser };
