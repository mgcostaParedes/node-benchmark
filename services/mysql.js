const config = require('../config');
const mysql = require('simple-pool-mysql');
const pool  = new mysql({ default: config.db });

module.exports = pool;