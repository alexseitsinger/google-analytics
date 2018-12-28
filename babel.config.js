module.exports = {
	presets: ["@babel/preset-env", "@babel/preset-react"],
	plugins: ["@babel/plugin-proposal-class-properties"],
	env: {
		development: {
			plugins: []
		},
		production: {
			plugins: []
		}
	}
}
