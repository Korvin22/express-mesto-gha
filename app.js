const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const {
  createUser, login,
} = require('./controllers/users');
const { checkAuth } = require('./middlewares/auth');

const PORT = 3000;
const app = express();

/* app.use(express.static(path.join(__dirnamey, 'public'))); */
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  return next();
});

app.use('/users', checkAuth, routerUsers);
app.use('/cards', checkAuth, routerCards);
app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('base are connected');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
