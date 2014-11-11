var express = require('express'),
	sio = require('socket.io'),
	request = require('superagent');

var app = express();

app.use(express.static('public'));

/* socketIO */
var io = sio.listen(app.listen(3000)),
	apiKey = '12f6d9ff9f007d3c93f3d689d57cef40',
	currSong,
	dj;

io.sockets.on('connection', function(socket) {
	console.log(socket.nickname + ' connected.');

	// 处理新用户加入事件
	socket.on('join', function(name) {
		socket.nickname = name;
		socket.broadcast.emit('announcement', name + ' join the chat.');

		if (!dj) {
			selectDJ(socket);
		} else {
			socket.emit('song', currSong);
		}
	});

	// 处理用户信息事件
	socket.on('text', function(msg, fn) {
		var time = new Date(Date.now()).toUTCString(),
			nickname = socket.nickname;

		fn(time);
		socket.broadcast.emit('text', nickname, msg, time);
	});

	// 处理歌曲搜索
	socket.on('search', function(q, fn) {
		request('http://tinysong.com/s/' + encodeURIComponent(q) + '?key=' + apiKey +'&format=json', function(res) {
			if (200 == res.status) {
				fn(JSON.parse(res.text));
			}
		});
	});

	// 处理当前播放歌曲
	socket.on('song', function(song) {
		if (socket.dj) {
			currSong = song;
			socket.broadcast.emit('song',song);
		}
	});

});

// 选中DJ
function selectDJ(socket) {
	dj = socket;
	io.sockets.emit('announcement', socket.nickname + ' is the new dj');
	socket.emit('djSelected');
	socket.dj = true;
	socket.on('disconnect', function(){
		dj = null;
		io.sockets.emit('announcement', 'the dj left —— next one join becomes dj');
	});
}