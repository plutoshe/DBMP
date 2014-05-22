var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a',
    database:'DBMP',
    port: 3306
});


/*------------------------Show phase---------------------*/

router.get('/showVideo', function(req,res) {
});

router.get('/showVideo', function(req, res) {
	console.log(req.body);

	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('SELECT * FROM Video', function(err, rows, field) {
		    if (err) { 
		      conn.rollback(function() {
		        throw err;
		      });
		    }
		});  
	});	
	
})


router.post('/showUserRemark', function(req, res) {
	conn.connect();
	//避免SQL注入攻击
	var sqlQuery = 'SELECT * FROM users WHERE id = ' + conn.escape(userId);  
	conn.query('SELECT * from employee', function(err, result) {
		var data = JSON.stringify(result);
	 
		// HTTP
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write(data + "\n");
    	res.end();
		console.log(data);
	    if (err) throw err;
	    //console.log('The solution is: ', rows);
	});
	conn.end();
});

module.exports = router;