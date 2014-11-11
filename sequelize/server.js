var express = require('express'),
	Sequelize = require('sequelize'),
	connect = require('connect');

var app = express(),
	sequelize = new Sequelize('todo-example', 'root', 'KrisZeng');

var Project = sequelize.define('Project', {
	title : Sequelize.STRING,
	description : Sequelize.TEXT,
	created : Sequelize.DATE
});

var Task = sequelize.define('Task', {
	title : Sequelize.STRING
});

Task.belongsTo(Project);
Project.hasMany(Task);

sequelize.sync();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});

app.use(connect.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
	Project.findAll().success(function (projects) {
		res.render('index', {projects : projects});
	});
});

// 展示指定项目的任务
app.get('/project/:id/tasks', function(req, res, next) {
	Project.find(Number(req.params.id)).success(function(project) {
		project.getTasks().success(function(tasks) {
			res.render('tasks', { project: project, tasks : tasks});
		});
	});
});

// 创建项目
app.post('/projects', function(req, res, next) {
	Project.build(req.body).save().success(function(obj) {
		res.send(obj);
	});
});

// 为指定项目添加任务
app.post('/project/:id/tasks', function(req, res, next) {
	// req.body.ProjectId = req.params.id;
	// Task.build(req.body).save().success(function(obj) {
	// 	res.send(obj);
	// }).error(next);

	Project.find(Number(req.params.id)).success(function(project) {
		project.addTask(req.body).success(function(obj) {
			res.send(obj);
		}).error(next);
	});
});

// 删除任务
app.del('/task/:id', function(req, res, next) {
});

// 删除项目
app.del('/project/:id', function(req, res, next) {
});

app.listen(3000, function() {
	console.log(' - listen on :3000');
});