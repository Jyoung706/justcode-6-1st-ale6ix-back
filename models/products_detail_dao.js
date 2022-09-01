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

const getProductDetailById = async (groupCode, detailCode, id) => {
  return await myDataSource.query(
    `
    SELECT product_name as productName, 
           price , 
           main_image_url as mainImageUrl, 
           stock 
      FROM products
      WHERE group_code_id = ?
        AND detail_code_id = ?
        AND id = ?;
    `,
    [groupCode, detailCode, id]
  );
};

module.exports = { getProductDetailById };
