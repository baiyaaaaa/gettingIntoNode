var express = require('express'),
	mongodb = require('mongodb'),
	connect = require('connect');

var app = express();

app.use(connect.bodyParser());

app.set('view engine', 'jade');
app.set('view options', {layout: false});

app.get('/', function(req, res) {
	res.render('index', { authenticated: false});
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/login:signupEmail', function(req, res) {
	res.render('login', {signupEmail: req.params.signupEmail});
});

app.get('/signup', function(req, res) {
	res.render('signup');
});

app.post('/signup', function(req, res, next) {
	app.users.insert(req.body.user, function(err, doc) {
		if (err) {return next(err);}
		res.redirect('/login/' + doc[0].email);
	});
});

// mongodb
var server = new mongodb.Server('127.0.0.1', 27017);

new mongodb.Db('website', server).open(function(err, client) {
	if (err) {throw err;}

	console.log('connect to mongodb');

	app.users = new mongodb.Collection(client, 'users');

	app.listen(3000, function() {
		console.log('app listen on 3000');
	});
});
