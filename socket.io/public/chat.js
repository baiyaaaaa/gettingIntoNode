window.onload = function() {
	var socket = io.connect('http://localhost:3000'),
		dj_control = document.getElementById('dj'),
		results = document.getElementById('results'),
		playing = document.getElementById('playing');

	socket.on('connect', function() {
		socket.emit('join', prompt("What is your name?"));

		// 发送信息
		var input = document.getElementById('input');

		document.getElementById('form').onsubmit = function() {
			var msg = input.value;
			socket.emit('text', msg, function(date) {
				addMessage('me', msg, date);
			});

			// 重置输入框
			input.value = '';
			input.focus();

			return false;
		};

		dj_control.style.display = "block";
		dj_control.onsubmit = function() {
			results.innerHTML = '';
			socket.emit('search', document.getElementById('s').value ,function(songs) {
				for (var i = 0, l = songs.length; i < l; i++) {
					(function(song) {
						var result = document.createElement('li');
						result.innerHTML = song.ArtistName + ' - <b>' + song.SongName + '</b>';
						var a = document.createElement('a');
						a.href = "#";
						a.innerHTML = "Select";
						a.onclick = function(ev) {
							socket.emit('song', song);
							play(song);
							return false;
						};
						result.appendChild(a);
						results.appendChild(result);
					})(songs[i]);
				}
			});
			return false;
		};

	});

	// 播放歌曲事件
	socket.on('play', play);
	
	// 当前用户选中为DJ
	socket.on('djSelected', function() {
		dj_control.className = 'isDJ';
	});

	// 接收信息
	socket.on('text', addMessage);

	// 处理新用户加入聊天室信息
	socket.on('announcement', function(msg){
		var li = document.createElement('li');
		li.className = 'announcement';
		li.innerHTML = msg;
		document.getElementById('message').appendChild(li);
	});

	function addMessage(from, text, date) {
		var li = document.createElement('li'),
			span = document.createElement('span');
		li.className = 'message';
		li.innerHTML = '<b>' + from + '</b>: ' + text;
		span.innerHTML = '(' + date + ')';
		li.appendChild(span);
		document.getElementById('message').appendChild(li);

		return li;
	}

	function play(song) {
		if (!song) {return;}
		playing.innerHTML = '<hr><b>Now Playing: </b>' + song.ArtistName + ' ' + song.SongName + '</br>';
		var audio = document.createElement('object');
		audio.border = 0;
		audio.data = song.Url;
		playing.appendChild(audio);
	}
};