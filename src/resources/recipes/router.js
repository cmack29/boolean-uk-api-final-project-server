const express = require("express");
const { getAll, createOneRecipe, updateRecipe } = require("./controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", createOneRecipe);
router.put("/:id", updateRecipe);

module.exports = router;
