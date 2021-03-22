const config = require('./config');
const PoolManager = require('mysql-connection-pool-manager');
// Pool manager settings
const poolManager = {
idleCheckInterval: 1000,
maxConnextionTimeout: 30000,
idlePoolTimeout: 3000,
errorLimit: 5,
preInitDelay: 50,
sessionTimeout: 60000,
mySQLSettings: config.db
}

// Initialising the instance
const mySQL = PoolManager(poolManager);
module.exports = mySQL;