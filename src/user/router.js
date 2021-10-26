const express = require("express");
const router = express.Router()

const { createUserProfile } = require("./controller")

router.post("/", createUserProfile)

module.exports = router;