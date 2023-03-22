module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,png,jpg,css,html}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};