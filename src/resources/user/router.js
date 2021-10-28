const express = require("express");
const {
  createUserProfile,
  getAll,
  deleteUserProfile,
  updateUser,
  getUserWithRecipes,
  updateprofile,
} = require("./controller");

const router = express.Router();

router.post("/", createUserProfile);

router.get("/", getAll);

router.put("/:id", updateUser);

router.put("/:id", updateprofile);

router.get("/:id", getUserWithRecipes);

router.delete("/:id", deleteUserProfile);

module.exports = router;
