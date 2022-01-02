const Pool  = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  password:"itends@64andthenthensome@61",
  host:"localhost",
  port: 5432,
  database:"yelp" // this will be yelp for
});

module.exports = pool;