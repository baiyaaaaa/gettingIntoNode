var qs   = require("querystring");

require("http").createServer(function(req,res){
	var content = '';

	req.on("data", function(chunk){
		content += chunk;
	});
	req.on("end", function(){
		res.writeHead(200);
		res.end('Done');
		console.log("Got name: " + qs.parse(content).name);
	});
}).listen(3000);