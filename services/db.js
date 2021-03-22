const db = require('./mysql');

async function query(sql) {
  const results = new Promise((resolve, reject) => {
    db.query(sql, (res) => {
      resolve(res);
    });
  })
  return await results
}
module.exports = query;