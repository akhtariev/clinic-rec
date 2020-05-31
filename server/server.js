const app = require('./src/app');
const logger = require('./src/utils/logger');

const port = 3001; 
// For now 3001, because docker container is supposed to run at 3001 otherwise can use process.env.PORT 

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});