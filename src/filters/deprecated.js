var getFile = require('../getFile.js');

module.exports = function(p) {
	var check = false;
	if(p.description && p.description.toLowerCase().indexOf('deprecate') >= 0) {
		check = true;
	}

	if(!check && p.versions) {
		Object.keys(p.versions)
			.forEach(function(key) {
				if(key.toLowerCase().indexOf('-dep') >= 0 || p.versions[key].toLowerCase().indexOf('-dep') >= 0) {
					check = true;
				} 
			})
	}

	if(check) {
		return getFile('http://registry.npmjs.org/' + p.name, ['versions', true])
			.then(function(data) {
				return data
					.reduce(function(deprecated, data) {
						return deprecated && data.deprecated
					}, true);

			});
	} else {
		return Promise.resolve(false);
	}
};
