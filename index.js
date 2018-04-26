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
				modules: (process.env.BABEL_OPTIONS || "").includes("webpack")
					? false
					: "commonjs",
			},
		],
	],
	plugins: [
		"transform-class-properties",
		"transform-decorators-legacy",
		[
			"transform-runtime",
			{
				polyfill: false,
				regenerator: true,
			},
		],
	],
};
