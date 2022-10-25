const questionService = require("../services/questionService");

const questionCreateController = async (req, res) => {
  const user_id = req.foundUser.id;
  const product_id = req.params.id;
  const { title, content } = req.body;

  if (!title) {
    res.status(400 || 500).json({ ERROR: "CHECK TITLE DATA" });
    return;
  } else if (!content) {
    res.status(400 || 500).json({ ERROR: "CHECK CONTENT DATA" });
    return;
  }

  try {
    const questionData = await questionService.questionCreateService(
      user_id,
      product_id,
      title,
      content
    );
    res.status(200).json({ message: "post created", questionData });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

const getQuestionController = async (req, res) => {
  const product_id = req.params.id;
  const questionData = await questionService.getQuestionService(product_id);
  res.status(200).json({ questionData });
};

const questionDeleteController = async (req, res) => {
  const user_id = req.foundUser.id;
  const { question_id } = req.params;

  try {
    await questionService.questionDelete(user_id, question_id);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};
module.exports = {
  questionCreateController,
  getQuestionController,
  questionDeleteController,
};
