var assert = require('assert');
var versions = require('../src/main/node.js').version;
var allVersions = [
	'6.4.0',
	'6.3.2'
];

function versionTests(object){
	allVersions.forEach((v) => {
		describe('[' + v + ']', function(){
			it('should contain the version', function(){
				assert.notEqual(object[v], null);
			});
			it('should contain a hash list', function(){
				assert.notEqual(object[v].hash, null);
			});
			describe('.hash', function(){
				it('should have atleast 1 hash in the hashlist', function(){
					assert.notEqual(object[v].hash.length, 0);
				});
			});

			it('should contain a password', function(){
				assert.notEqual(object[v].password, null);
			});
		});
	});
}

describe('jet', function(){
	describe('.versions', function(){
		describe('.steam', function(){
			describe('.windows', function(){
				versionTests(versions.steam.windows);
			});
			describe('.mac', function(){
				versionTests(versions.steam.mac);
			});
		});

		describe('.android', function(){
			versionTests(versions.android);
		});

		describe('.ios', function(){
			versionTests(versions.ios);
		});
	});
});
