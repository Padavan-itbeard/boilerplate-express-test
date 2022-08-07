require('dotenv').config();
const express = require('express');
const path = require('path');

const PORT = process.env.PORT ?? 8081;
const app = express();
const logs = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app
  .use(logs)
  .use(express.urlencoded({ extended: true }))
  .use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/change', (req, res) => {
  const {name} = req.body;

  console.log(`Name: ${name}`);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening to server on port: ${PORT}`);
});