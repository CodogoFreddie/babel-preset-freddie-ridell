const targets = {
	browsers: "> 1%",
	node: "current",
};

module.exports = {
	presets: [
		"stage-3",
		"react",
		[
			"env",
			{
				targets,
				modules: process.env.BABEL_OPTIONS.contains("webpack")
					? false
					: "umd",
			},
		],
	],
	plugins: [
		"transform-class-properties",
		[
			"transform-runtime",
			{
				polyfill: false,
				regenerator: true,
			},
		],
	],
};
