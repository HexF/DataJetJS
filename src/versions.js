var versions = {
	steam: {
		windows: {
			'6.4.0': {
				platform: 'Steam Windows',
				version: '6.4.0',
				password: '6DAD88C792DD3E6C',
				hash: [
					{
						type: 'md5',
						hash: 'c78cacc311d603cdd24111ea529d98e5'
					}
				]
			},
			'6.3.2': {
				platform: 'Steam Windows',
				version: '6.3.2',
				password: '9E7C0AFC9BCD1B0A',
				hash: [
					{
						type: 'md5',
						hash: 'yeahidontknowlol'
					}
				]
			}
		},
		mac: {
			'6.4.0': {
				platform: 'Steam MacOS',
				version: '6.4.0',
				password: '1058BF9702322AD9',
				hash: [
					{
						type: 'md5',
						hash: 'yeahidontknowlol'
					}
				]
			},
			'6.3.2': {
				platform: 'Steam MacOS',
				version: '6.3.2',
				password: '8844B52CFB1B362E',
				hash: [
					{
						type: 'md5',
						hash: 'yeahidontknowlol'
					}
				]
			}
		}
	},
	android: {
		'6.4.0': {
			platform: 'Android',
			version: '6.4.0',
			password: '400AFE813C341CEA',
			hash: [
				{
					type: 'md5',
					hash: 'yeahidontknowlol'
				}
			]
		},
		'6.3.2': {
			platform: 'Android',
			version: '6.3.2',
			password: '6597296902FFCC03',
			hash: [
				{
					type: 'md5',
					hash: 'yeahidontknowlol'
				}
			]
		}
	},
	ios: {
		'6.4.0': {
			platform: 'iOS',
			version: '6.4.0',
			password: '2E1BE7CCF3049725',
			hash: [
				{
					type: 'md5',
					hash: 'yeahidontknowlol'
				}
			]
		},
		'6.3.2': {
			platform: 'iOS',
			version: '6.3.2',
			password: 'C3A2874DE8867F27',
			hash: [
				{
					type: 'md5',
					hash: 'yeahidontknowlol'
				}
			]
		}
	}
};
var metadata = {
	platforms: [
		versions.steam.windows,
		versions.steam.mac,
		versions.android,
		versions.ios
	],
	versions: [
		'6.4.0',
		'6.3.2'
	]
};
module.exports = Object.assign(versions, metadata);
