require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const apiRoutes = require("./routes");
const { requestLogger } = require('./utils/requestLogger');

/////////////////////
mongoose.set('strictQuery', false);
////////////////////

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

/*************custom routes*****************/
app.use('/api', apiRoutes);

/***********error-handler*************/

app.use(notFound);

/***********error-handler*************/
app.use(errorHandler);

module.exports = app;
