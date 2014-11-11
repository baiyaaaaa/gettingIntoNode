var express = require('express'),
	mysql = require('mysql'),
	connect = require('connect'),
	config = require('./config');

var db = mysql.createConnection(config);
var app = express();

db.connect();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});

app.use(connect.bodyParser());

app.get('/', function(req, res, next) {
	db.query('SELECT id, title, description FROM item', function(err, results) {
		res.render('index', {items: results});
	});
});

app.post('/create', function(req, res, next) {
	db.query('INSERT INTO item SET title = ?, description = ?', [req.body.title, req.body.description], function(err, info) {
		if (err) {return next(err);}
		console.log(' - item created with id %s', info.insertId);
		res.redirect('/');
	});
});

app.get('/item/:id', function(req, res, next) {
	function getItem(fn) {
		db.query('SELECT id, title, description FROM item WHERE id = ? LIMIT 1',
		[req.params.id], function(err, results) {
			if (err) {return next(err);}
			if (!results[0]) {return res.send(404);}
			fn(results[0]);
		});
	}
	function getReview(item_id, fn) {
		db.query('SELECT text, stars FROM review WHERE item_id = ?',
		[item_id], function(err, results) {
			if (err) {return next(err);}
			fn(results);
		});
	}
	getItem(function(item) {
		getReview(item.id, function(reviews) {
			res.render('item', {item: item, reviews: reviews});
		});
	});
});

app.post('/item/:id/review', function(req, res, next) {
	db.query('INSERT INTO review SET item_id = ?, stars = ?, text = ?',
		[req.params.id, req.body.stars, req.body.text], function(err, info) {
		if (err) {return next(err);}
		console.log(' - review created with id %s', info.insertId);
		res.redirect('/item/' + req.params.id);
	});
});

app.listen(3000, function() {
	console.log('app listened on :3000');
});