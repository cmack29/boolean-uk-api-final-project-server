const express = require("express");
const {
  createUserProfile,
  getAll,
  deleteUserProfile,
  getUserWithRecipes,
} = require("./controller");

const router = express.Router();

router.post("/", createUserProfile);

router.get("/", getAll);

router.get("/:id", getUserWithRecipes);

router.delete("/:id", deleteUserProfile);

module.exports = router;
