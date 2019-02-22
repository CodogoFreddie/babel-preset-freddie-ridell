const targets = {
	browsers: [
		">1%",
		"not ie 11",
		"not op_mini all",
		"maintained node versions",
	],
	node: true,
};

module.exports = (api, { ramda, ramdaUseEs, emotion, modules } = {}) => {
	if (process.env.BABEL_HELP) {
		console.log(`
@freddieridell/babel-preset:
	options:
		ramda: should we use ramda at all?
        ramdaUseEs: should ramda use its es imports
        emotion: should we use emotions
        modules: how should env package its modules

    env vars:
        MINIFY = true | false
        NODE_ENV = "production" | "develop" | "test" 
		`);
	}

	return {
		comments: !process.env.NODE_ENV === "production" && process.env.MINIFY,
		presets: [
			require("@babel/preset-react").default,
			require("@babel/preset-flow").default,
			process.env.NODE_ENV === "production" &&
				process.env.MINIFY &&
				require("babel-preset-minify"),
			[
				require("@babel/preset-env").default,
				{
					targets,
					modules,
				},
			],
		].filter(Boolean),
		plugins: [
			require("babel-plugin-preval"),
			emotion && require("babel-plugin-emotion").default,
			ramda && [require("babel-plugin-ramda").default, { useEs: Boolean(ramdaUseEs) }],
			[
				require("@babel/plugin-transform-runtime").default,
				{
					corejs: false,
					helpers: true,
					regenerator: true,
					useESModules: false,
				},
			],
		].filter(Boolean),
	};
};
