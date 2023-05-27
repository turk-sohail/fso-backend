const app = require('./app');
const connectDB = require('./services/db');
const config = require('./utils/config');
const { info, appError } = require('./utils/logger');

const start = async () => {
  const port = config.PORT;
  try {
    // connectDB
    await connectDB(config.DB_URI);
    info(`database connection successfull`);
    app.listen(port, () => info(`server is running on port ${port}`));
  } catch (error) {
    appError(error);
  }
};

start();
