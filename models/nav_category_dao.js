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

const getCategoryBygroupId = async () => {
  const categoryData = await myDataSource.query(
    `SELECT group_code.id as LargeCategoryId , 
              group_code_name as LargeCategoryName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'smallCategoryId',detail_code.id,
          'smallCategoryName',detail_code.detail_code_name
          )
        ) as smallCategories
      FROM group_code
      JOIN detail_code ON detail_code.group_code_id = group_code.id
      GROUP BY group_code.id;
      `
  );
  return categoryData;
};

module.exports = { getCategoryBygroupId };
