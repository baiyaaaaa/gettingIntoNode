var express = require('express'),
	wsio = require('websocket.io');

var app = express();

app.use(express.static('public'));

var ws = wsio.attach(app.listen(3000)),
	total = 0,
	position = {};

ws.on('connection', function(socket) {
	socket.id = ++total;
	console.log(socket.id);

	socket.on('message', function(msg) {
		var pos;

		try {
			pos = JSON.parse(msg);
		} catch(ex) {
			return;
		}

		position[socket.id] = pos;

		// 广播位置信息给其他连接者
		broadcast(JSON.stringify({
			type : "position",
			pos : pos,
			id : socket.id
		}));
	});

	socket.on('close', function() {
		delete position[socket.id];

		console.log(socket.id);

		// 广播当前用户断开连接的信息给其他连接者
		broadcast(JSON.stringify({
			type : "disconnect",
			id : socket.id
		}));
	});

	function broadcast(msg) {
		var i = 0,
			l = ws.clients.length;

		for (; i < l; i++) {
			if ( ws.clients[i] && ws.clients[i].id != socket.id ) {
				ws.clients[i].send(msg);
			}
		}
	}
});

