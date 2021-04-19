/*
   external plugins
   rollup-plugin-node-resolve=>帮助rollup找到外部模块，然后导入
   rollup-plugin-commonjs —将CommonJS模块转换为 ES2015 供 Rollup 处理
   rollup-plugin-babel — 让我们可以使用es6新特性来编写代码
   rollup-plugin-terser — 压缩js代码，包括es6代码压缩
   rollup-plugin-eslint — js代码检测
*/
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
import { eslint } from "rollup-plugin-eslint";
// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),  // 这样 Rollup 能找到 `ms`
        commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
        eslint(),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true,       // 使plugin-transform-runtime生效
        }),
        terser()
    ]
};