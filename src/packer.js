const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const patcher = require('./patcher');

//TODO: Dont use node-7z, instead find something that supports ZIP Extraction with passwords written in native JS
const Seven = require('node-7z');
const sevenzipbin = require('7zip-bin').path7za;

module.exports = {
	/**
     * Validates the jet hashes and returns a set of functions that can be run to patch the jet.
     * @param {Path} jetFile - The Path to the data.jet file
     * @param {JetVersion} jetVersion - The version of the data.jet
     * @param {boolean} checkHash - Should we check the hash of the jet?
     * @returns {Object} API Calls for the unpacked jet
     */
	unpack: function(jetFile, jetVersion, checkHash = true, hashMethod = 'md5'){
		//Validate
		if (checkHash) {
			var hashM = jetVersion.hash.filter((t) => {
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
		}

		return {
			path: path.resolve(jetFile),
			password: jetVersion.password,
			patches: [],
			/**
             * Add a patch to the 
             * @param {Patch[]|Patch} patch
             */
			addPatch: function(patch){
				if (Array.isArray(patch)) {
					return this;
				}
				this.patches.push(patch);
				return this;
			},
			/**
             * Export the patched jet to this path, defaults to the origional
             * @param {Path} fileLocation 
             */
			pack(fileLocation = this.path, tempPath = path.resolve(__dirname, '.tmp.datajet')) {
				if (fileLocation != this.path) {
					fs.copyFileSync(this.path, fileLocation);
				}

				if (this.patches.length > 0) {
					//Apply our patches on the files.
					if (patcher.hasConflicts(this.patches)) throw Error('Patches being applied have conflicts');
					patches = [];
				}
				return fileLocation;

				//re-insert files into the jet
			},
			saveFiles(directory) {
				//export the entire jet then modify it
				var dir = path.resolve(directory);
				Seven.extractFull(this.path, dir, {
					recursive: true,
					password: this.password,
					$bin: sevenzipbin
				});
				if (this.patches.length > 0) {
					//Apply our patches on the files.
					patches = [];
				}
				return directory;
			}
		};
	}
};
