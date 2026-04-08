const express = require("express");
const cors = require("cors");
const vectorRouter = require("./routes/vector.Routes");
const recommendationRouter = require("./routes/recommendation.Routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!!");
});

app.use("/api/vectors", vectorRouter);
app.use("/api/recommendations", recommendationRouter);

module.exports = app;