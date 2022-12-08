/* eslint-disable consistent-return */
const Card = require('../models/card');
const {
  getValidationError,
  getDefaultError,
  getNotFoundError,
} = require('../constants/errors');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    console.error(e);
    getDefaultError(res);
  }
};
const deleteCard = async (req, res) => {
  console.log(req.params);
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      getNotFoundError(res, "Карточка не найдена");
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      getValidationError(res, "Данный введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};
const createCard = async (req, res) => {
  try {
    console.log(req.user._id);
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    if (!card) {
      getNotFoundError(res, "Карточка не найдена");
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    );
    if (!newCard) {
      getNotFoundError(res, "Карточка не найдена");
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      return res.status(500).json({ message: "произошла ошибка" });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    );
    if (!newCard) {
      getNotFoundError(res, "Карточка не найдена");
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      return res.status(500).json({ message: "произошла ошибка" });
    }
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
