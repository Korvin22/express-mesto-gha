const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "произошла ошибка" });
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }
    return res.status(200).send(user);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "произошла ошибка" });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (e) {
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

const updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about});
    if (req.body.name.length < 2 || req.body.about.length <2) {
      return res.status(400).json({ message: errors.join(", ") });
    }
    return res.status(200).send(newUser);
  } catch (e) {
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar});
    return res.status(200).send(newUser);
  } catch (e) {
    const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
};
