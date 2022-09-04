const questionDao = require("../models/questionDao");

const questionCreateService = async (user_id, product_id, title, content) => {
  return await questionDao.createQuestion(user_id, product_id, title, content);
};

const questionDelete = async (user_id, question_id) => {
  await questionDao.questionDelete(user_id, question_id);
};

module.exports = { questionCreateService, questionDelete };
