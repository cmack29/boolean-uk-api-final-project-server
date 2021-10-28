const express = require("express");
const {
  getAll,
  createOneRecipe,
  updateRecipe,
  getOneRecipe,
} = require("./controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOneRecipe);
router.post("/", createOneRecipe);
router.put("/:id", updateRecipe);

module.exports = router;
