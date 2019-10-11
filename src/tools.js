const versions = require('./versions');
const crypto = require('crypto');
const allHashes = crypto.getHashes();
const pkgjson = require('../package.json');
const Seven = require('node-7z');
const fs = require('fs');
const sevenzipbin = require('7zip-bin').path7za;
const path = require('path');
const glob = require('glob');

module.exports = {
	jetVersion: function(jetFile, hashMethod = 'md5'){
		var hash = crypto.createHash(hashMethod);
		hash.setEncoding('hex');
		hash.write(fs.readFileSync(jetFile));
		hash.end();

		var calculatedHash = hash.read();
		var version = null;
		versions.platforms.forEach((p) => {
			Object.keys(p).forEach((v) => {
				var ver = p[v];

				ver.hash.forEach((h) => {
					if (h.hash == calculatedHash) version = ver;
				});
			});
		});
		return version;
	},
	getAllHashes: function(jetFile){
		var buff = fs.readFileSync(jetFile);
		var jetHashes = [];
		allHashes.forEach((hashMethod) => {
			var hash = crypto.createHash(hashMethod);
			hash.setEncoding('hex');
			hash.write(buff);
			hash.end();

			var calculatedHash = hash.read();
			jetHashes.push({
				type: hashMethod,
				hash: calculatedHash
			});
		});

		return jetHashes;
	},
	makePatch: function(standardJet, moddedJet, author, name, version, tmpdir = path.resolve('.tmp.datajet')){
		var patchFile = {
			name: name,
			version: version,
			author: author,
			metadata: {
				generator: 'DataJetJS v' + pkgjson.version,
				jetVersion: 'Unknown'
			}
		};

		var ver = this.jetVersion(standardJet, 'md5');
		if (ver == null) return null;
		patchFile.metadata.jetVersion = ver.platforms + ' v' + ver.version;

		//calc diffs

		var normpath = path.resolve(tmpdir, 'normal');
		var modpath = path.resolve(tmpdir, 'modded');
		Seven.extractFull(standardJet, normpath, {
			recursive: true,
			password: ver.password,
			$bin: sevenzipbin
		}).on('end', () => {
			Seven.extractFull(moddedJet, modpath, {
				recursive: true,
				password: ver.password,
				$bin: sevenzipbin
			}).on('end', () => {
				glob(normpath + '/**/*', (err, res) => {
					if (err) throw err;
					console.log(res);

					return patchFile;
				});
			});
		});
	}
};
