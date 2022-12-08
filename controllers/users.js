const User = require("../models/user");
const {
  getValidationError,
  getDefaultError,
  getNotFoundError,
} = require("../constants/errors");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    console.error(e);
    getDefaultError(res)
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      getNotFoundError(res, "Пользователь не найден")
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    }
    if (e.name === "CastError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true }
    );
    return res.status(200).send(newUser);
  } catch (e) {
    if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, { new: true, runValidators: true });
    return res.status(200).send(newUser);
  } catch (e) {
    /*const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") });*/
        if (e.name === "ValidationError") {
      getValidationError(res, "Данные введены не корректно");
    } else {
      getDefaultError(res);
    }
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
