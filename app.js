const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const createApp = () => {
  const app = express();
  app.use(cors(), express.json(), routes);

  return app;
};

module.exports = { createApp };
