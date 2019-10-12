var jets = require('./jets.json');

function convertFormat(input, platformFriendlyName){
	var versions = Object.keys(input);
	var res = {};
	versions.forEach((version) => {
		var e = input[version];
		var o = {
			password: e.password,
			hash: e.hashes,
			version: version,
			platform: platformFriendlyName
		};
		res[version] = o;
	});
	return res;
}

var versions = {
	winrt: convertFormat(jets.winrt, 'Windows RT'),
	steam: {
		windows: convertFormat(jets.steam.windows, 'Steam Windows'),
		macos: convertFormat(jets.steam.macos, 'Steam MacOS')
	},
	ios: convertFormat(jets.ios, 'iOS'),
	android: convertFormat(jets.android, 'Android')
};

var platforms = [
	versions.steam.windows,
	versions.steam.mac,
	versions.android,
	versions.ios
];

var allVersions = [];
platforms.forEach((platform) => {
	if (platform == undefined) return;
	var versions = Object.keys(platform);
	versions.forEach((version) => {
		allVersions.push(platform[version]);
	});
});

var metadata = {
	platforms: platforms,
	allVersions: allVersions
};
module.exports = Object.assign(versions, metadata);
