function getValidationError(res, userMessage) {
  return res.status(400).send({ message: userMessage });
}

function getNotFoundError(res, userMessage) {
  return res.status(404).send({ message: userMessage });
}

function getWrongData(res, userMessage) {
  return res.status(409).send({ message: userMessage });
}

function getDefaultError(res) {
  return res.status(500).json({ message: 'произошла ошибка' });
}

module.exports = {
  getValidationError, getNotFoundError, getDefaultError, getWrongData,
};
