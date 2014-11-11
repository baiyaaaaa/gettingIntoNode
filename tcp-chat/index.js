var net = require("net"),
	count = 0;
/*
 * 创建服务器
 */
var server = net.createServer(function(conn){
	// handle connection
	console.log('\033[90m	new connection!\033[90m');
	conn.write(
		"\n > welcome to node-chat!" +
		"\n > " + count + " other people are connecting now." +
		"\n > please write your name and press enter."
	);
	count++;
});

server.listen(3000, function(){
	console.log('\033[96m	server listen on *:3000');
});