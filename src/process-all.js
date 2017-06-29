var fs = require('fs');
var JSONStream = require('JSONStream');
var RxNode = require('rx-node');

var unpublished = require('./filters/unpublished.js');
var settings = require('./settings.js');

module.exports = function processAll(stream) {
	var isFirst = true;
	var subscriber = RxNode.fromStream(stream)
		.filter(function(data) { return typeof data === 'object' })
		.map(function(data) {
			if(data.key !== data.id) console.log(data);
			if(isFirst) {
				isFirst = false;
				return data.key;
			}
			return '\n' + data.key;
		});

	RxNode.writeToStream(subscriber, fs.createWriteStream(settings.keyOutput));
}
