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
				if (patch['patches'] != undefined) {
					this.patches = this.patches.concat(patch['patches']);
				}
				else if (Array.isArray(patch)) {
					this.patches = this.patches.concat(patch);
				}
				else {
					this.patches.push(patch);
				}
				return this;
			},
			/**
             * Export the patched jet to this path, defaults to the path of the jet passed in initially
             * @param {Path} fileLocation 
             */
			pack(fileLocation = this.path, tempPath = path.resolve('.tmp.datajet')) {
				this.patches = patcher.flatten(this.patches);
				if (fileLocation != this.path) {
					fs.copyFileSync(this.path, fileLocation);
				}
				if (this.patches.length > 0) {
					//Apply our patches on the files.

					this.patches.forEach((patch) => {
						var file = patch.file;
						var patches = patch.patches;
						var fp = path.resolve(tempPath, file);
						Seven.extractFull(fileLocation, tempPath, {
							password: this.password,
							$bin: sevenzipbin,
							$cherryPick: [
								file
							]
						}).on('end', () => {
							var org = JSON.parse(fs.readFileSync(fp).toString('utf-8'));
							var content = patcher.patch(org, patches);
							fs.writeFileSync(fp, JSON.stringify(content, null, 2));
							Seven.update(fileLocation, path.resolve(tempPath, 'Assets'), {
								password: this.password,
								$bin: sevenzipbin
							});
						});
					});

					this.patches = [];
				}

				return fileLocation;

				//re-insert files into the jet
			},
			saveFiles(directory) {
				var dir = path.resolve(directory);
				this.patches = patcher.flatten(this.patches);

				Seven.extractFull(this.path, dir, {
					recursive: true,
					password: this.password,
					$bin: sevenzipbin
				}).on('end', () => {
					if (this.patches.length > 0) {
						//Apply our patches on the files.
						this.patches.forEach((patch) => {
							var file = patch.file;
							var patches = patch.patches;
							var fp = path.resolve(directory, file);

							var org = JSON.parse(fs.readFileSync(fp).toString('utf-8'));
							var content = patcher.patch(org, patches);
							fs.writeFileSync(fp, JSON.stringify(content, null, 2));
						});

						this.patches = [];
					}
				});
				return dir;
			}
		};
	}
};
