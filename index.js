const express = require('express');
const app = express();
const port = 3000;
const query = require('./services/db');
const binarySearch = require('./services/binarySearch');
var cluster = require('cluster');
const mysql = require('./services/mysql');
var numCPUs = require('os').cpus().length;

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/countries', async (req, res) => {
  const rows = await query('Select * from apps_countries');
  res.json({'data': rows});
});

app.use('/country', async (req, res) => {
  const rows = await query('Select * from apps_countries where country_code="PT"');
  res.json({'data': rows});
});

app.use('/country-complex', async (req, res) => {
  let rows = await query('Select apps_countries.*, apps_countries_detailed.* from apps_countries left join apps_countries_detailed on apps_countries.country_code = apps_countries_detailed.countryCode order by apps_countries_detailed.geonameId desc');
  rows = rows.map((row, index) => {
    row.newValue = 'index_' + index;
    return row;
  })
  res.json({'data': rows});
});

app.use('/compute', (req, res) => {
  let x = 0, y = 1;

		let max = 10000 + Math.random() * 500;

		for (let i = 0; i <= max; i++) {
		    let z = x + y;
		    x = y;
		    y = z;
		}

		return res.json({ status: 'done' })
});

app.use('/search', (req, res) => {
  const array = [];
  for(i = 0; i < 10000; i++) {
    array.push(i);
  }
  const search = binarySearch(array, Math.floor((Math.random() * 10000) + 1));
  return res.json({
    status: 'completed',
    numberSearched: search
  });
});

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
}

app.on('close', function() {
  mysql.end();
});