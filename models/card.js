const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,

  },
  likes: {
    type: [mongoose.ObjectId],
  },
  createdAt: {
    type: Date,
  }
});

const cardModel = mongoose.model('card', cardSchema)

module.exports = cardModel;