const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const PORT = 3000;
const app = express();

/* app.use(express.static(path.join(__dirnamey, 'public'))); */
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '638998e8e5e932e174b0972e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('base are connected');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
