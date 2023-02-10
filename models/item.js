const mongoose = require("mongoose");

/* This is creating a new schema for the item model. */
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = itemSchema;
