const express = require("express");
const { createUserProfile, deleteUserProfile } = require("./controller");

const router = express.Router();

router.post("/", createUserProfile);

router.delete("/:id", deleteUserProfile);

module.exports = router;
