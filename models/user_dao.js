const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database initiate fail");
  });

const getAccountData = async (account) => {
  const [accountData] = await myDataSource.query(
    `
      SELECT account 
        FROM users 
        WHERE account = ?`,
    [account]
  );
  if (!accountData) {
    return;
  } else if (accountData.account === account) {
    const error = new Error("already exist account");
    error.statusCode = 400;
    throw error;
  }
};

const createUser = async (
  account,
  password,
  name,
  email,
  phone_number,
  birth
) => {
  const [userCheck] = await myDataSource.query(
    `SELECT account from users where account = ?`,
    [account]
  );
  if (!userCheck) {
    await myDataSource.query(
      `INSERT INTO users(
        account,
        user_password,
        user_name,
        email,
        phone_number,
        birth
        ) VALUES (?,?,?,?,?,?);`,
      [account, password, name, email, phone_number, birth]
    );
  } else if (userCheck.account === account) {
    let error = new Error("ERROR : already has user data");
    error.statusCode = 400;
    throw error;
  }
};

const getUserData = async (account) => {
  const [userData] = await myDataSource.query(
    `
    SELECT account,user_name,email,phone_number,birth
      FROM users WHERE account = ?;  
  `,
    [account]
  );

  if (!userData.birth) {
    birth = null;
  }

  return userData;
};

const getUserByEmail = async (account) => {
  const [user] = await myDataSource.query(
    // user에 대괄호를 씌워주면 첫번째 값만 가져온다
    ` SELECT id, account, user_password FROM users WHERE account = ?`,
    [account]
  );
  return user;
};

const getUserById = async (user_id) => {
  const [user] = await myDataSource.query(
    // user에 대괄호를 씌워주면 첫번째 값만 가져온다
    ` SELECT id, account, user_password FROM users WHERE id = ?`,
    [user_id]
  );
  return user;
};

const getUser = async (user_id)=>{
  const [user] =  await myDataSource.query( // user에 대괄호를 씌워주면 첫번째 값만 가져온다
    ` SELECT id, account  FROM users WHERE id = ?`, [user_id])
  return user
}

const getUserOrderCartCount = async (user_id)=>{
  const getUserOrderCartCount = await myDataSource.query(`
  SELECT COUNT(uo.id) AS count
  FROM user_order uo 
  JOIN products p ON uo.product_id = p.id 
  WHERE uo.order_status_id = 1
  AND uo.user_id = ?
  ORDER BY uo.created_at DESC
  ;`, [user_id])
  
  return getUserOrderCartCount
}

module.exports = {
  getAccountData,
  createUser,
  getUserData,
  getUserByEmail,
  getUserById,
  getUser,
  getUserOrderCartCount
};
