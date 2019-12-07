module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          ws:true,
          target: 'http://47.111.158.56/yiren/public/',
          changeOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
        }
      }
    }
  }