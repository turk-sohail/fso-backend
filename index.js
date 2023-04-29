require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./services/db');
const Note = require('./models/Note');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const logger = require('./utils/logger');
const config = require('./utils/config');
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

const start = async () => {
  const port = config.PORT;
  try {
    // connectDB
    await connectDB(config.DB_URI);
    logger.info(`database connection successfull`);
    app.listen(port, () => logger.info(`server is running on port ${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
