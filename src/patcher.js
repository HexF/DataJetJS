const jp = require('rfc6902');

module.exports = {
	patch: function(fileContent, patch){
		jp.applyPatch(fileContent, patch);
		return fileContent;
	},
	flatten: function(patches){
		pch = [];
		patches.forEach((e) => {
			if (!pch.map((t) => t.file).includes(e.file)) {
				pch.push(e.file);
			}
		});
		return patches;
	}
};
