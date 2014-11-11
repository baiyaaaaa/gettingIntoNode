// var connect = require("connect"),
// 	fs   = require("fs");

// var server = http.createServer(function(req, res) {
// 	if ('GET' === req.method && '/images' === req.url.substr(0,7) &&
// 		'.jpg' === req.url.substr(-4)) {
// 	console.log(req.url.substr(0,7));
// 		fs.stat(__dirname + req.url, function(err, stat) {
// 			if (err || !stat.isFile()) {
// 				res.writeHead(404);
// 				res.end('Not Found');
// 				return;
// 			}
// 			server(__dirname + req.url, 'application/jpg');
// 		});
// 	} else if ('GET' === req.method && '/' === req.url) {
// 		server(__dirname + '/index.html', 'text/html');
// 	} else {
// 		res.writeHead(404);
// 		res.end('Not Found');
// 	}

// 	function server(path, type) {
// 		res.writeHead(200, {'ContentType': type});
// 		fs.createReadStream(path).pipe(res);
// 	}
// });
// server.listen(3000);

var connect = require("connect"),
	time   = require("./request-time");

var server = connect.createServer();
server.use(connect.logger('dev'));

server.use(time({time: 500}));

server.use(function(req, res, next){
	if ('/a' === req.url) {
		res.end('Fast!');
	} else {
		next();
	}
});

server.use(function(req, res, next){
	if ('/b' === req.url) {
		setTimeout(function(){
			res.end('Slow!');
		}, 1000);
	} else {
		next();
	}
});

server.listen(3000);