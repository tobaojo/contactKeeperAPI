const express = require("express");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});

router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.get("/:id", (req, res) => {
  res.send("get a single contact");
});

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const newContact = {};
  if (name) newContact.name = name;
  if (email) newContact.email = email;
  if (type) newContact.type = type;
  if (phone) newContact.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "contact not found" });
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({ message: "not Authorised" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: newContact,
      },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "contact not found" });
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({ message: "not Authorised" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server Error" });
  }
});
module.exports = router;
