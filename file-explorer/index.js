/**
 * Module dependencies.
 */

var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;

function readFile(dir) {
	fs.stat(dir, function(err, stat) {
		if (!stat.isDirectory()) {
			stdin.pause();
			fs.readFile(dir, 'utf8', function(err, data){
				console.log();
				console.log('\033[90m' + data.replace(/(.*)/g, '$1') + '\033[90m');
			});
		} else {
			fs.readdir(dir, function(err, files) {

				files.forEach(function(filename, index){
					fs.stat(dir + '/' + filename, function(err, stat) {
						if (stat.isDirectory()) {
							console.log('	' + index + '	\033[36m' + filename + '\033[36m');
						} else {
							console.log('	' + index + '	\033[90m' + filename + '\033[90m');
						}

						if (++index == files.length) {
							console.log('');
							stdout.write('\033[33mEnter your choice: \033[33m');
							stdin.resume();
							stdin.setEncoding('utf8');

							stdin.on('data', function(choice) {
								readFile(dir + '/' + files[Number(choice)]);
							});
						}
					});
				});
			});
		}
	});

}

readFile(process.cwd());
