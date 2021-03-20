const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: 'localhost',
    user: 'root',
    password: '123Ac123',
    database: 'benchmark',
    connectionLimit: 10,
  },
};


module.exports = config;