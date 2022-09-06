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

const createQuestion = async (user_id, product_id, title, content) => {
  if (title.length > 255) {
    const error = new Error("ERROR : title Too long");
    error.statusCode = 400;
    throw error;
  } else if (content.length > 500) {
    const error = new Error("ERROR : content Too long");
    error.statusCode = 400;
    throw error;
  }

  await myDataSource.query(
    `INSERT INTO question (user_id,product_id,title,content) 
       VALUES (?,?,?,?);
      `,
    [user_id, product_id, title, content]
  );

  const questionData = await myDataSource.query(
    `SELECT question.id, users.account,title,content,question.created_at as createdAt
      FROM question
      JOIN users ON users.id = question.user_id
      WHERE question.user_id = ? AND question.product_id = ?
      ORDER BY question.id DESC LIMIT 1`,
    [user_id, product_id]
  );
  return questionData;
};

const getQuestion = async (product_id) => {
  return myDataSource.query(
    `
  SELECT account,title,content,question.created_at as createdAt
    FROM question
    JOIN users WHERE users.id = question.user_id
    AND question.product_id = ?  
`,
    [product_id]
  );
};

const questionDelete = async (user_id, question_id) => {
  const [userCheck] = await myDataSource.query(
    `SELECT id,user_id 
      FROM question
      WHERE id = ?
    `,
    [question_id]
  );

  if (!userCheck) {
    const error = new Error("Not existing post");
    error.statusCode = 400;
    throw error;
  }
  if (userCheck.user_id !== user_id) {
    const error = new Error("Unauthorized Users");
    error.statusCode = 400;
    throw error;
  }

  await myDataSource.query(
    `
    DELETE FROM question WHERE id = ?;`,
    [question_id]
  );
};

module.exports = { createQuestion, getQuestion, questionDelete };
