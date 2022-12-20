const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUser, createUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), createUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), updateUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), updateAvatar);

router.use((req, res) => res.status(404).send({ message: 'Роут не найден' }));
module.exports = router;
