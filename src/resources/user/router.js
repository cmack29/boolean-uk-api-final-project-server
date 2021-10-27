const express = require("express");
const { createUserProfile, getAll, deleteUserProfile } = require("./controller");

const router = express.Router();

router.post("/", createUserProfile);

router.get("/", getAll)

router.delete("/:id", deleteUserProfile);

module.exports = router;
