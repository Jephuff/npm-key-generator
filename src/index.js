var fs = require('fs');
var JSONStream = require('JSONStream');
var http = require('http');

var processAll = require('./process-all.js');
var settings = require('./settings.js');

if (settings.useCache) {
	processAll(fs.createReadStream(settings.cachePath, 'utf8').pipe(JSONStream.parse([true])));
} else {
	http.get(settings.allURL, function(res) {
		if (res.statusCode !== 200) {
			console.log('status code: ', res.statusCode);
			return;
		}
		processAll(res.pipe(JSONStream.parse([true])));
	}).end();
}
