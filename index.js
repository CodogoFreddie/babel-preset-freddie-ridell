const targets = {
	browsers: "> 1%",
	node: "current",
};

/*
 * options:
 * ramdaUseEs: should ramda use its es imports
 * emotion: should we use emotions
 * modules: how should env package its modules
 *
 * env vars:
 * MINIFY = true | false
 * NODE_ENV = "production" | "develop" | "test" 
 */

module.exports = (_, { ramdaUseEs, emotion, modules }) => ({
	comments: !process.env.NODE_ENV === "production" && process.env.MINIFY,
	presets: [
		"@babel/react",
		"@babel/flow",
		process.env.NODE_ENV === "production" && process.env.MINIFY && "minify",
		[
			"@babel/env",
			{
				targets,
				modules,
			},
		],
	].filter(Boolean),
	plugins: [
		"preval",
		emotion && "emotion",
		["ramda", { useEs: Boolean(ramdaUseEs) }],
		[
			"@babel/plugin-transform-runtime",
			{
				corejs: false,
				helpers: true,
				regenerator: true,
				useESModules: false,
			},
		],
	].filter(Boolean),
	//presets: [
	//"stage-3",
	//"react",
	//],
	//plugins: [
	//"transform-class-properties",
	//"transform-decorators-legacy",
	//[
	//"ramda",
	//{
	//useES: false,
	//},
	//],
	//[
	//"transform-runtime",
	//{
	//polyfill: false,
	//regenerator: true,
	//},
	//],
	//],
});
