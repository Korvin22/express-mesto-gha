/*через классы не смог сделать - валяться ошибки*/

function getValidationError(res, message) {
  return res.status(400).send({ message: message });
}

function getNotFoundError(res, message) {
  return res.status(404).send({ message: message });
}

function getDefaultError(res) {
  return res.status(500).json({ message: "произошла ошибка" });
}


module.exports = {getValidationError, getNotFoundError, getDefaultError}
