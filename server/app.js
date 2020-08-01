require('dotenv/config');
const PORT = process.env.PORT;
const logger = require('./components/logger');
const createApp = require('./config/express');

const app = createApp();

app.listen(PORT, () => {
   logger.info(`Server listening on port ${PORT}`);
});
