const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

module.exports = {
	/**
     * Validates the jet hashes and returns a set of functions that can be run to patch the jet.
     * @param {string} jetFile - The Path to the data.jet file
     * @param {JetVersion} jetVersion - The version of the data.jet
     */
	unpack: function(jetFile, jetVersion, hashMethod = 'md5'){
		//Validate
		var hashM = jetVersion.hash.map((t) => {
			if (t.type == hashMethod) return t;
		});
		if (hashM.length != 1) throw Error('Hash method is not supported on this jet file');
		var jetHash = hashM[0];
		var hash = crypto.createHash(hashMethod);
		hash.setEncoding('hex');
		hash.write(fs.readFileSync(jetFile));
		hash.end();

		var calculatedHash = hash.read();

		if (calculatedHash != jetHash.hash)
			throw Error(
				`The hashes did not match for the versions (Wanted: ${jetHash.hash}, Actual: ${calculatedHash})`
			);
		return {
			path: path.resolve(jetFile),
			password: jetVersion.password
		};
	}
};
