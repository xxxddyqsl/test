'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
   // 静态资源文件夹
   assetsSubDirectory: 'static',
   // 发布路径
  assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
  // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
  proxyTable: {//在这里面配置代理跨域
    '/api': {//在这里面 /apis 就相当于'http://jj.woniu.com/'
      // target: 'http://jj.woniu.com/',// 接口域名
      target: 'http://log.woniu.com/',// 接口域名10.103.4.12 log.woniu.com
      // secure: true,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
      pathRewrite: {
          '^/api': ''//需要rewrite重写的,
      }
    }
  },
    // Paths
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    // proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', 
    // host: '172.18.70.26', // can be overwritten by process.env.HOST http://172.18.70.26/
    // host: '10.103.4.12', // 配置 host
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //是否自动打开浏览器
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',//css js

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
