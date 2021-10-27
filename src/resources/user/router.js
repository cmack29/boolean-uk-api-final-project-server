const express = require("express");
const { createUserProfile, deleteUserProfile } = require("./controller");

<<<<<<< HEAD
const { createUserProfile, getAll } = require("./controller")
=======
const router = express.Router();
>>>>>>> 306769b30ee87e42808ae7e6e027e867fb373608

router.post("/", createUserProfile);

<<<<<<< HEAD
router.get("/", getAll)

module.exports = router;
=======
router.delete("/:id", deleteUserProfile);

module.exports = router;
>>>>>>> 306769b30ee87e42808ae7e6e027e867fb373608
