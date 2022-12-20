/* eslint-disable consistent-return */
const Card = require('../models/card');
const {
  getValidationError,
  getDefaultError,
  getNotFoundError,
} = require('../constants/errors');
const { decodeToken } = require('../middlewares/auth');

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    getDefaultError(res);
    next();
  }
};
const deleteCard = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const ownerId = decodeToken(token);
    const { cardId } = req.params;
    console.log(ownerId, cardId);
    if (cardId !== ownerId) {
      return res
        .status(403)
        .send({ message: 'Невозможно удалить карточку другого пользователя' });
    }
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      getNotFoundError(res, 'Карточка не найдена');
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      getValidationError(res, 'Данный введены не корректно');
    } else {
      getDefaultError(res);
    }
    next();
  }
};
const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    if (!card) {
      getNotFoundError(res, 'Карточка не найдена');
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      getValidationError(res, 'Данные введены не корректно');
    } else {
      getDefaultError(res);
    }
    next();
  }
};

const likeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!newCard) {
      getNotFoundError(res, 'Карточка не найдена');
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === 'CastError') {
      getValidationError(res, 'Данные введены не корректно');
    } else {
      return res.status(500).json({ message: 'произошла ошибка' });
    }
    next();
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!newCard) {
      getNotFoundError(res, 'Карточка не найдена');
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === 'CastError') {
      getValidationError(res, 'Данные введены не корректно');
    } else {
      return res.status(500).json({ message: 'произошла ошибка' });
    }
    next();
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
