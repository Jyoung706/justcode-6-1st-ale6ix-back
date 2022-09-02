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

const createUser = async (
  account,
  user_password,
  user_name,
  email,
  phone_number
) => {
  const [userCheck] = await myDataSource.query(
    `SELECT account from users where account = ?`,
    [account]
  );
  if (!userCheck) {
    const userData = await myDataSource.query(
      `INSERT INTO users(
        account,
        user_password,
        user_name,
        email,
        phone_number
        ) VALUES (?,?,?,?,?);`,
      [account, user_password, user_name, email, phone_number]
    );
    return userData;
  } else if (userCheck.account === account) {
    let error = new Error("ERROR : already has user data");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createUser };
