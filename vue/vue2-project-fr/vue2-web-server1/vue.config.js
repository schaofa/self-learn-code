const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(process.env, 'envvvvvv')
console.log(process.env.VUE_APP_BASE_API, 'VUE_APP_BASE_API')
console.log(process.env.NODE_ENV, 'NODE_ENV')

const path = require('path')
const port = 8081
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    // disableHostCheck: true,
  },
  publicPath: '/',
  outputDir: path.resolve(__dirname, 'web-front-app'),
  productionSourceMap: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.devServer
    .port(port)
    .headers({
      'Access-control-Allow-Origin': '*'
    })
    .proxy({
      // '/pro-api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true
      // },
      // '/dev-api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true
      // }
    })
  }
})
