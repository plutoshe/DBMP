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


/* GET home page. */
router.get('/main', function(req, res) {

	var tableView = 
		[
			{
				name:'创建用户',
				link : '/createUser'
			},
			{
				name:'创建视频',
				link : '/createVideo'
			},
			{
				name:'创建目录',
				link:'/CreateCategory'
			},
			{
				name:'创建评论',
				link:'/createRemark'
			},
			{
				name:'用户点击事件',
				link:'/createClick'
			},
			{
				name:'用户关注事件',
				link:'/createFocusOn'
			},
			{
				name:'更新评论',
				link:'/updateRemark'
			},
			{
				name:"显示当前视频",
				link:'/showVideo'
			},
			{
				name:"显示用户评论",
				link:'/showUserRemark'
			},
			{
				name:'显示目录点击前十',
				link:'/showCategoryClick'
			},
			{	
				name:"展示视频评论",
				link:'/showVideoRemark'
			},
			{
				name:"展示用户关注类别",
				link:'/showUserFocus'
			},

		];

	res.render('index', { title: '欢迎来到我的世界', table : tableView});
});

/*---------------------Create Phase----------------------------*/


router.get('/createUser', function(req,res){
	var inputTable = 
	[
		{
			tname:"Name",
			demostration:"用户名",
		},
		{
			tname:"NickName",
			demostration:"昵称"
		},
		/*{
			tname:"ps1",
			demostration:"密码"
		},
		{
			tname:"ps2",
			demostration:"确认密码"
		}*/
	];
	res.render('actor', {submit : "submitUser", title : "创建新用户", inputTable : inputTable});
});



router.get('/CreateCategory', function(req,res){
	var inputTable = 
	[
		{
			tname:"Name",
			demostration:"目录名"
		}
	];
	res.render('actor', {submit : "submitCateGory", title : "创建新目录", inputTable : inputTable});
});


router.get('/createVideo', function(req,res){
	var inputTable = 
	[
		{
			tname:"Name",
			demostration:"视频名字"
		},
		{
			tname:"UserName",
			demostration:"用户名"
		}
	];
	var tmp = {Name : conn.escape(req.body['Name']), NickName : conn.escape(req.body['NickName'])};
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('SELECT * From Category', function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        
			    });
				
		    } else {
		    	console.log(result);
		    	var tmp = {
		    		tname : "Category",
		    		demostration : "选择目录"
		    	}
		    	console.log(result);
		    	for (i in result) {
		    		result[i]['CName'] = result[i]['CName'].replace(/\'/g, '');
		    	}
		    	res.render('Video', {submit : "submitVideo", title : "创建新视频", inputTable : inputTable, Category : tmp, CategoryTable: result});
		    }
		});  
	});	
});

router.get('/createClick', function(req,res){
	var inputTable = 
	[
		{
			tname:"Name",
			demostration:"用户名"
		},
		{
			tname:"Video",
			demostration:"视频编号"
		}
	];
	res.render('actor', {submit : "submitClick", title : "创建新点击", inputTable : inputTable});
});

router.get('/createRemark', function(req,res){
	var inputTable = 
	[
		{
			tname:"Name",
			demostration:"用户名"
		},
		{
			tname:"Video",
			demostration:"视频编号"
		},
		{
			tname:"Remark",
			demostration:"评论"
		}
	];
	res.render('actor', {submit : "submitRemark", title : "创建新评论", inputTable : inputTable});
});

router.get('/createFocusOn', function(req,res){
	var inputTable = 
	[
		{
			tname:"UserName",
			demostration:"用户名"
		}
	];
	var tmp = {Name : conn.escape(req.body['Name']), NickName : conn.escape(req.body['NickName'])};
	conn.beginTransaction(function(err) {
		if (err) { throw err; }
		conn.query('SELECT * From Category', function(err, result) {

			
		    if (err) { 
			    conn.rollback(function() {
			        
			    });
				
		    } else {
		    	console.log(result);
		    	var tmp = {
		    		tname : "Category",
		    		demostration : "选择目录"
		    	}
		    	console.log(result);
		    	for (i in result) {
		    		result[i]['CName'] = result[i]['CName'].replace(/\'/g, '');
		    	}
		    	res.render('Video', {submit : "submitFocus", title : "创建新关注", inputTable : inputTable, Category : tmp, CategoryTable: result});
		    }
		});  
	});	
});


router.get('/justtext', function(req,res) {
	console.log('222');
	res.render('submit', {title:"Submit",content:"d",link:"/main"});
});




module.exports = router;
