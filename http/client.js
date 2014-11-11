var http = require("http"),
    qs   = require("querystring");

console.log(__dirname);
function send(yName) {
	http.request({
		host: "127.0.0.1",
		port: "3000",
		url: "/",
		method: "POST"
	}, function(res) {
		res.setEncoding("utf8");
		res.on('data', function(chunk){});
		res.on('end', function() {
			console.log("\n sumbit name successfully!");
			process.stdout.write("\n your name: ");
		});
	}).end(qs.stringify({name: yName, age: 3}));
}

process.stdout.write("\n your name: ");
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function(name){
	send(name.replace('\n',''));
});