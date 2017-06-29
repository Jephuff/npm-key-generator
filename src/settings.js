module.exports = {
    cachePath: process.env.CACHE_OUTPUT || '/tmp/npm-registry-dump.json',
    allURL: 'https://skimdb.npmjs.com/registry/_all_docs',
    keyOutput: process.env.KEY_OUTPUT || '/tmp/npm-all-keys.txt',
};