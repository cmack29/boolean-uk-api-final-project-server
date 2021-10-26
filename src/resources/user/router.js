const express = require("express");
const router = express.Router()

const { createUserProfile, getAll } = require("./controller")

router.post("/", createUserProfile)

router.get("/", getAll)

module.exports = router;