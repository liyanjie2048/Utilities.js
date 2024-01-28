const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

exports.default = {
    input: "./src/index.ts",
    output: {
        file: "./dist/liyanjie.utilities.js",
        name: "liyanjie.utilities",
        format: "umd",
        sourcemap: true,
        globals: {
            "uuid": "uuid",
        }
    },
    plugins: [resolve(), typescript()],
};
