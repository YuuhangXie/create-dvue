const { defineConfig } = require('@vue/cli-service')
const getPages = require('./config/getPages')

const basePage = getPages()
const nameList = process.env.VUE_APP_ENTRY ? process.env.VUE_APP_ENTRY.split(',') : []
let pages = basePage

if (nameList.length > 0) {
  pages = {}
  nameList.forEach((item) => {
    pages[item] = basePage[item]
  })
}

module.exports = defineConfig({
  devServer: {
    host: 'localhost',
    https: false,
    open: nameList.length ? nameList[0] : false,
    proxy: {},
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  assetsDir: '[name]',
  publicPath: './',
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
  },
  transpileDependencies: true,
  productionSourceMap: false,
  pages
})
