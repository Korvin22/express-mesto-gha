const Card = require("../models/card");
console.log(Card);
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "произошла ошибка" });
  }
};
const deleteCard = async (req, res) => {
  console.log(req.params);
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      return res.status(404).send({ message: "Карточка не найден" });
    }
    return res.status(200).send(card);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка" });
  }
};
const createCard = async (req, res) => {
  try {
    console.log(req.user._id);
    const card = await Card.create(req.body);
    if (!card) {
      return res.status(404).send({ message: "Карточка не найден" });
    }
    return res.status(200).send(card);
  } catch (e) {
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

const likeCard = async (req, res) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    );
    return res.status(200).send(newCard);
  } catch (e) {
    return res.status(500).json({ message: "произошла ошибка" });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    );
    return res.status(200).send(newCard);
  } catch (e) {
    return res.status(500).json({ message: "произошла ошибка" });
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
