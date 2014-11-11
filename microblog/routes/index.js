/*
 * GET home page.
 */
/*module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: '首页'
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '用户注册',
		});
	});
};*/
exports.index = function(req, res) {
	res.render('index', {
		title: 'Express'
	});
};

exports.user = function(req, res) {};
exports.post = function(req, res) {};
exports.reg = function(req, res) {};
exports.doReg = function(req, res) {};
exports.login = function(req, res) {};
exports.doLogin = function(req, res) {};
exports.logout = function(req, res) {};
exports.getAppData = function(req, res) {
	res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
	res.write('{\
		"name": "white",\
		"age": "18",\
		"addr": "你好！",\
		"job": "student",\
		"title": "你好！",\
		"content": "返回的JSON"\
	}');
	res.end();
};