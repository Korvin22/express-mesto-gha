const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateAvatar);

router.use((req, res) => res.status(404).send({ message: 'Роут не найден' }));
module.exports = router;
