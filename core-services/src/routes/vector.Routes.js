const express = require("express");
const { createVector } = require("../controllers/vector.Controller");

const router = express.Router();

router.post("/", createVector);

module.exports = router;