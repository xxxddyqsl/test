module.exports = {
    entry: "./src/ts/main.ts",
    // entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/src/dist",
        library: 'finalModule',//打包的输出对象暴露在 变量上 finalModule //整个库向外暴露的变量名
        libraryTarget: 'umd'//umd即支持所有情况的自定义输出 通过umd方式输出, 暴露为所有的模块定义下都可运行的方式， 输出文件的模块化规范 一共有这几种规范 "var"  "this" "commonjs"  "commonjs2" "amd" "umd" 否则模块无法正确的输出 
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },

    module: { 
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" ,
            //  options: {
            //     "presets": [
            //         ['es2015', {modules: false}]
            //     ],
            // },
        },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ], 
    },
    // 配置 webpack 插件
    // plugins:[
    //     "transform-remove-strict-mode"  //配置插件，这里很重要
    // ],
    mode: 'development',// 开发环境？arguments
    // mode : 'production',// 生产环境
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    }
};
