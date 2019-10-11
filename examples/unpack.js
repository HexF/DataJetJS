const datajet = require('../src/main/node');
const path = require('path');

var up = datajet.packer.unpack(
	path.resolve(__dirname, '../test/jets/steamwindows_6.4.0.jet'),
	datajet.version.steam.windows['6.4.0']
);

up.saveFiles(path.resolve(__dirname, '../.tmp'));
