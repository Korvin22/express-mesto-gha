const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

router.use((req, res) => res.status(404).send({ message: 'Роут не найден' }));
module.exports = router;
