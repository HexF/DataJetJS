module.exports = {
	patch: function(filePath, patch){},
	/**
	 * 
	 * @param {Patch[]} patches 
	 */
	hasConflicts: function(patches){
		return false;
	}
};
