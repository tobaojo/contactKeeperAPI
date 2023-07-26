const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all user contact");
});

router.post("/", (req, res) => {
  res.send("register a user");
});

router.get("/:id", (req, res) => {
  res.send("get a single contact");
});

router.put("/:id", (req, res) => {
  res.send("update contact");
});

router.delete("/:id", (req, res) => {
  res.send("delete contact");
});
module.exports = router;
