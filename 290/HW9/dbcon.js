var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_atchleyj',
  password        : 'Pbuddy93!',
  database        : 'cs290_atchleyj'
});

module.exports.pool = pool;
