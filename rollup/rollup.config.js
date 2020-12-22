// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

export default {
    input: 'src/main.js',
    output: {
        name:"rollupcase",
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),  // 这样 Rollup 能找到 `ms`
        commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
        eslint(),
        babel(),
        terser()]
};