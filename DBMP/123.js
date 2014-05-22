var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a',
    database:'DBMP',
    port: 3306
});
conn.connect();
conn.query('SELECT * from employee', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
});
conn.end();