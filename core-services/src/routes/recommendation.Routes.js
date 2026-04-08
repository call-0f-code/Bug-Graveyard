const express = require("express");
const { getSimilarBugs } = require("../controllers/recommendation.Controller");

const router = express.Router();

router.get("/:id", getSimilarBugs);

module.exports = router;