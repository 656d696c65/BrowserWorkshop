const path = require("node:path")

module.exports = {
    plugins: {
        "@pandacss/dev/postcss": {
            configPath: path.resolve(__dirname, "../shared/panda.config.ts"),
            cwd: path.resolve(__dirname, "../shared"),
        },
    },
}
