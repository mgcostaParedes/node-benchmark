const db = require('./mysql');

async function query(sql) {
  const [results, ] = await db.query(sql);
  return results;
}
module.exports = query;