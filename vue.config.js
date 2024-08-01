const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/portfolio/',
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

  }
})
