var http = require('http');
var https = require('https');
var JSONStream = require('JSONStream');

module.exports = function getFile(file, jsonPath, logProgress) {
	return new Promise(function(resolve, reject) {
		var req = (file.indexOf('https') === 0 ? https : http).get(file, function(res) {
			var len = parseInt(res.headers['content-length'], 10);
			var total = (len / 1048576).toFixed(2);
			var progress = 0;
			var allData = [];
			console.log('Download starting for ' + file.slice(0, 80));

			var json = res.pipe(JSONStream.parse(jsonPath))
			json.on('data', function(data) {
				allData.push(data);
			});

			json.on('end', function() {
				resolve(allData);
			});

			json.on('error', function(err) {
				console.log('retry!')
				getFile(file, logProgress, logProgress)
					.then(resolve)
			})
		});

		req.end();
		req.on('error', function(err) {
			console.log('retry!')
			getFile(file, logProgress)
				.then(resolve)
		});
	});
};
