const jp = require('rfc6902');

module.exports = {
	patch: function(fileContent, patch){
		var fc = fileContent;
		var err = jp.applyPatch(fc, patch);
		if (err[0] == null) return fc;

		throw Error('Failed to apply patches: ' + err.join('\n'));
	},
	flatten: function(patches){
		pch = [];
		patches.forEach((e) => {
			if (!pch.map((t) => t.file).includes(e.file)) {
				pch.push(e);
			}
			else {
				var p = pch[pch.map((t) => t.file).indexOf(e.file)];

				e.patches.forEach((c) => {
					if (p.patches.map((t) => t.path).includes(c.path))
						throw Error('Two or more patches are conflicting with eachother');
					p.patches.push(c);
				});
			}
		});
		return pch;
	},
	conflicts: function(patches){
		pch = [];
		cfts = [];
		patches.forEach((e) => {
			if (!pch.map((t) => t.file).includes(e.file)) {
				pch.push(e);
			}
			else {
				var p = pch[pch.map((t) => t.file).indexOf(e.file)];

				e.patches.forEach((c) => {
					if (p.patches.map((t) => t.path).includes(c.path)) {
						cfts.push([
							e,
							p
						]);
						//throw Error('Two or more patches are conflicting with eachother');
					}
					p.patches.push(c);
				});
			}
		});
		return cfts;
	}
};
