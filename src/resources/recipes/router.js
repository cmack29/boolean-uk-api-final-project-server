const express = require("express");
const { getAll, createOneRecipe } = require("./controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", createOneRecipe);

module.exports = router;
