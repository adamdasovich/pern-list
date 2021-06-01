const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "Cambior1972",
    database: "pernstack",
    host: "localhost",
    port: 5432
});

module.exports = pool;