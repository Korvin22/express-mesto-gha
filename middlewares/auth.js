/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/newline-after-import
const jwt = require('jsonwebtoken');
const secretOrPrivateKey = 'code_code_code';
function generateToken(payload) {
  return jwt.sign(payload, secretOrPrivateKey);
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  return jwt.verify(token, secretOrPrivateKey, { expiresIn: '7d' });
}

function decodeToken(token) {
  if (!token) {
    return false;
  }
  return jwt.decode(token);
}

function checkAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'code_code_code');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
}

module.exports = {
  generateToken,
  checkToken,
  checkAuth,
  decodeToken,
};
