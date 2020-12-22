/*
 * @Description: 
 * @version: 
 * @Author: zsm
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-24 10:03:35
 */
module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'Scripts/',
  // indexPath:"index.cshtml",
  filenameHashing: false,
  // productionGzip: true, // 开启 gzip 功能
  // productionGzipExtensions:['js', 'css'],
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter",
      'axios': 'axios',
      "element-ui": "ELEMENT"
    }
  },
  devServer: {
    proxy: {
      '/api': { //此处并非一定和url一致。
        // target: 'http://localhost:6624',
        // target: 'http://manage.huayixh.com/',
        target: 'http://admin.huayixh.com',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}