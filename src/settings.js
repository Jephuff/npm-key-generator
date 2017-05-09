var useCache = process.env.USE_CACHE || false;
var saveCache = process.env.SAVE_CACHE || false;

module.exports = {
    cachePath: process.env.CACHE_OUTPUT || '/tmp/npm-registry-dump.json',
    useCache: useCache,
    allURL: 'http://registry.npmjs.org/-/all', // /static/all.json
    keyOutput: process.env.KEY_OUTPUT || '/tmp/npm-all-keys.txt',
    saveCache: saveCache && !useCache,
};