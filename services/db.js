const db = require('./mysql');

async function query(sql, params) {
  const [results, ] = await db.execute(sql, params);
  return results;
}
module.exports = query;