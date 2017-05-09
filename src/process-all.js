var fs = require('fs');
var JSONStream = require('JSONStream');
var RxNode = require('rx-node');

var unpublished = require('./filters/unpublished.js');
var settings = require('./settings.js');

module.exports = function processAll(stream) {
	if (settings.saveCache) {
		stream.pipe(JSONStream.stringify()).pipe(fs.createWriteStream(settings.cachePath))
	}

	var isFirst = true;
	var subscriber = RxNode.fromStream(stream)
		.filter(function(data) { return typeof data === 'object' && !unpublished(data); })
		.map(function(data) {
			if(isFirst) {
				isFirst = false;
				return data.name;
			}
			return '\n' + data.name;
		});

	RxNode.writeToStream(subscriber, fs.createWriteStream(settings.keyOutput));
}
