const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get a logged in user");
});

router.post("/", (req, res) => {
  res.send("Auth(login) user");
});

module.exports = router;
