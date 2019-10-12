const jp = require('rfc6902');

module.exports = {
	patch: function(fileContent, patch){
		var fc = fileContent;
		var err = jp.applyPatch(fc, patch);
		if (err[0] == null) return fc;

		throw Error('Failed to apply patches: ' + err.join('\n'));
	},
	flatten: function(patchesin){
		patches = [];
		patchesin.forEach((p) => {
			if (Array.isArray(p)) {
				p.forEach((q) => {
					patches.push(q);
				});
			}
			else {
				patches.push(p);
			}
		});
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
	conflicts: function(patchesin){
		patches = [];
		patchesin.forEach((p) => {
			if (Array.isArray(p)) {
				p.forEach((q) => {
					patches.push(q);
				});
			}
			else {
				patches.push(p);
			}
		});
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
							p,
							c.path
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
