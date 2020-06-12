const pg = require('pg');

const sqlClient = new pg.Client(process.env.SQL_CONN);

module.exports = sqlClient;
