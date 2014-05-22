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
conn.connect();

var queues = require('mysql-queues'); 
const DEBUG = true; 
queues(conn, DEBUG);  


router.post('/submitUser', function(req, res) {
	
	/*console.log(req.body);
	if (req.body.id==='') {
		res.send('创建失败，ID不能为空');
	} else {
		res.send('创建成功');		
	}*/
	
	/*console.log(tmp);
	console.log(conn.escape(tmp));
	conn.query('INSERT INTO User SET ?', tmp, function(err, result) {
		if (err) { throw err; }
		var message = '232';
		console.log("####");
		
		
	});*/
	

	/*var trans = connection.startTransaction();
	trans.query('INSERT INTO User SET ?', tmp, function(err, result) {
 		if (err) 
		{  
		 	console.log(123);
			throw err;  trans.rollback();  
		}   
		else {  
			console.log(111);
			trans.commit(function(err, info) {  
				console.log(111);  
				//conn.end();
				res.render('submit', {title:"Submit",content:message,link:"/main"});
				cnosel.log(111);
				
			});
		} 	
		console.log(111);

	 });
	trans.execute();
	*/
	console.log(req.body);
	var tmp = {Name : conn.escape(req.body['Name']), NickName : conn.escape(req.body['NickName'])};
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('INSERT INTO User SET ?',tmp, function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        //throw err;
			    });
				res.render('submit', {title:"Submit",content:err,link:"/main"});
		    } else {
		    	res.render('submit', {title:"Submit",content:'创建成功',link:"/main"});
		    }
		});  
	});	

});


router.post('/submitCategory', function(req, res) {
	
	console.log(req.body);
	var tmp = {CName : conn.escape(req.body['Name']) };
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('INSERT INTO Category SET ?',tmp, function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        //throw err;
			    });
				res.render('submit', {title:"Submit",content:err,link:"/main"});
		    } else {
		    	res.render('submit', {title:"Submit",content:'创建成功',link:"/main"});
		    }
		});  
	});	

});


router.post('/submitVideo', function(req, res) {
	console.log(123);
	console.log(req.body);
	var tmp = {
				Name : conn.escape(req.body['Name']), 
				User_Name : conn.escape(req.body['UserName']),
				Category_idCategory1 : conn.escape(parseInt(req.body['Category']))
			};
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('INSERT INTO Video SET ?',tmp, function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        //throw err;
			    });
				res.render('submit', {title:"Submit",content:err,link:"/main"});
		    } else {
		    	res.render('submit', {title:"Submit",content:'创建成功',link:"/main"});
		    }
		});  
	});	

});

router.post('submitClick',function(req, res) {
	console.log(req.body);
	var tmp = {Name : conn.escape(req.body['Name']), NickName : conn.escape(req.body['NickName'])};
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('INSERT INTO User SET ?',tmp, function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        //throw err;
			    });
				res.render('submit', {title:"Submit",content:err,link:"/main"});
		    } else {
		    	res.render('submit', {title:"Submit",content:'创建成功',link:"/main"});
		    }
		});  
	});	

});


module.exports = router;