const reviewService = require("../services/review_service");

const reviewCreateController = async (req, res) => {
  const user_id = req.foundUser.id;
  const { product_id, title, content } = req.body;

  if (!title) {
    res.status(400).json({ ERROR: "CHECK TITLE DATA" });
    return;
  } else if (!content) {
    res.status(400).json({ ERROR: "CHECK CONTENT DATA" });
    return;
  }

  try {
    const reviewData = await reviewService.reviewCreateService(
      user_id,
      product_id,
      title,
      content
    );
    res.status(200).json({ message: "post created", reviewData });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

const reviewDeleteController = async (req, res) => {
  const user_id = req.foundUser.id;
  const { review_id } = req.body;

  try {
    await reviewService.reviewDelete(user_id, review_id);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json(error.message);
  }
};

module.exports = { reviewCreateController, reviewDeleteController };
