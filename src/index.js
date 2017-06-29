var fs = require('fs');
var JSONStream = require('JSONStream');
var https = require('https');

var processAll = require('./process-all.js');
var settings = require('./settings.js');

https.get(settings.allURL, function(res) {
	if (res.statusCode !== 200) {
		console.log('status code: ', res.statusCode);
		return;
	}

	processAll(res.pipe(JSONStream.parse(['rows', true])));
}).end();
