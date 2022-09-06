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

const getDetailPageById = async (id) => {
  const detailPageData = await myDataSource.query(
    `
    SELECT id as productsId,
           product_name as productName, 
           price, 
           main_image_url as mainImageUrl, 
           stock 
      FROM products
      WHERE id = ?;
    `,
    [id]
  );

  return detailPageData;
};

const getDetailReviewData = async (id) => {
  const detailReview = await myDataSource.query(
    `
    SELECT reviews.id,users.account,title,content,reviews.created_at as createdAt,reviews.updated_at as updatedAt
      FROM reviews
      JOIN users ON users.id = reviews.user_id
      WHERE reviews.product_id = ?;
    `,
    [id]
  );
  return detailReview;
};

const getDetailQuestionData = async (id) => {
  const detailQuestion = await myDataSource.query(
    `
    SELECT question.id,users.account,title,content,question.created_at as createdAt,question.updated_at as updatedAt
	    FROM question
	    JOIN users ON users.id = question.user_id
      WHERE question.product_id = ?;
    `,
    [id]
  );
  return detailQuestion;
};

module.exports = {
  getDetailPageById,
  getDetailReviewData,
  getDetailQuestionData,
};
