const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const port = 3000;
const query = require('./services/db');
const binarySearch = require('./services/binarySearch');

app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});