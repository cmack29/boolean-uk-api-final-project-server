const express = require("express");
const {} = require("./controller");

const router = express.Router();
router.get("/", (req, res) => {
  console.log({ test: true });

  res.json({ test: true });
});

module.exports = router;
