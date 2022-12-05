const router = require("express").Router();
const { getAllUsers, getUser, createUser,updateUser,updateAvatar} = require("../controllers/users");
const {getAllCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

router.get("/cards", getAllCards);
router.delete("/cards/:cardId", deleteCard);
router.post("/cards", createCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard)

module.exports = router;
