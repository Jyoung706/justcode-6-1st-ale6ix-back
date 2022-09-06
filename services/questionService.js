const questionDao = require("../models/questionDao");

const questionCreateService = async (user_id, product_id, title, content) => {
  return await questionDao.createQuestion(user_id, product_id, title, content);
};

const getQuestionService = async (product_id) => {
  return await questionDao.getQuestion(product_id);
};

const questionDelete = async (user_id, question_id) => {
  await questionDao.questionDelete(user_id, question_id);
};

module.exports = { questionCreateService, getQuestionService, questionDelete };
