require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const notesRouter = require('./routes/notes');
const mongoose = require('mongoose');

/////////////////////
mongoose.set('strictQuery', false);
////////////////////

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

/*************custom routes*****************/
app.use('/api/v1/notes', notesRouter);

/***********error-handler*************/

app.use(notFound);

/***********error-handler*************/
app.use(errorHandler);

module.exports = app;
