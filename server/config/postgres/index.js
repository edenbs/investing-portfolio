const {Pool} = require('pg');
const logger = require('../../components/logger');

const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION_URI
});

pool.on('error', err => {
    logger.error(err, 'Error occurred in postgres');
});

module.exports.pgClient = pool;
