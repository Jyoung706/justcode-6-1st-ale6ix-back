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
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

const createReview = async (user_id, product_id, title, content) => {
  const userPayCheck = await myDataSource.query(
    `SELECT user_id,product_id,order_status_id 
      FROM user_order
      WHERE user_id = ?
      AND product_id = ?
      AND (order_status_id = 3 OR order_status_id = 4)
    `,
    [user_id, product_id]
  );

  if (userPayCheck.length === 0) {
    const error = new Error("ERROR: NOT PAIED YET");
    error.statusCode = 400;
    throw error;
  }

  if (title.length > 255) {
    const error = new Error("ERROR : title Too long");
    console.log(error.statusCode);
    error.statusCode = 400;
    throw error;
  } else if (content.length > 500) {
    const error = new Error("ERROR : content Too long");
    error.statusCode = 400;
    throw error;
  }

  await myDataSource.query(
    `INSERT INTO reviews (user_id,product_id,title,content) 
     VALUES (?,?,?,?);
    `,
    [user_id, product_id, title, content]
  );

  const reviewData = await myDataSource.query(
    `SELECT reviews.id, users.account,title,content,reviews.created_at as createdAt
      FROM reviews
      JOIN users ON users.id = reviews.user_id
      WHERE reviews.user_id = ? AND reviews.product_id = ?
      ORDER BY reviews.id DESC LIMIT 1`,
    [user_id, product_id]
  );
  return reviewData;
};

const reviewDelete = async (id, user_id) => {
  const [userCheck] = await myDataSource.query(
    `SELECT id,user_id 
      FROM reviews
      WHERE id = ?
    `,
    [id]
  );

  if (userCheck.user_id !== user_id) {
    const error = new Error("Unauthorized Users");
    error.statusCode = 400;
    throw error;
  }

  await myDataSource.query(
    `
    DELETE FROM reviews WHERE id = ?;`,
    [id]
  );
};

module.exports = { createReview, reviewDelete };
