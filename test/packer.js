var assert = require('assert');
var datajet = require('../src/main/node.js');
var path = require('path');
describe('jet', function(){
	describe('.packer', function(){
		describe('#unpack()', function(){
			it('should exist', function(){
				assert.notEqual(datajet.packer.unpack, undefined);
			});
			it('should unpack a 6.4.0 jet', function(){
				datajet.packer.unpack(
					path.resolve(__dirname, './jets/steamwindows_6.4.0.jet'),
					datajet.version.steam.windows['6.4.0'],
					'md5'
				);
			});
		});
	});
});
