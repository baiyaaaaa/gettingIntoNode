var mysql = require('mysql'),
	config = require('./config');

delete config.database;
var db = mysql.createConnection(config);

db.connect();

// 创建数据库
db.query('CREATE DATABASE IF NOT EXISTS `cart-example`');
db.query('use `cart-example`');

// 创建表
db.query('DROP TABLE IF EXISTS item');
db.query('CREATE TABLE item (' +
	'id INT(11) AUTO_INCREMENT,' +
	'title VARCHAR(255),' +
	'description TEXT,' +
	'created DATETIME,' +
	'PRIMARY KEY (id)' +
	')');

db.query('DROP TABLE IF EXISTS review');
db.query('CREATE TABLE review (' +
	'id INT(11) AUTO_INCREMENT,' +
	'item_id INT(11),' +
	'text TEXT,' +
	'stars INT(11),' +
	'created DATETIME,' +
	'PRIMARY KEY (id)' +
	')');

// 关闭客户端
db.end(function() {
	process.exit();
});