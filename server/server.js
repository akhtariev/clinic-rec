const app = require('./src/app');
const logger = require('./src/utils/logger');
const sqlClient = require('./src/utils/sqlClient');

const port = process.env.PORT || 5001;

app.listen(port, async () => {
  try {
    await sqlClient.connect();
    logger.info(`Server is running on port: ${port}`);
  } catch(err) {
    logger.info(`Error starting server: ${err}`);
  }
});