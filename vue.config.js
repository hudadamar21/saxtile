// Inside vue.config.js
module.exports = {
  publicPath: '/saxtile/',
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Saxtile',
    themeColor: '#1d5ed6',
    msTileColor: '#eeeeee',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'blue'
  }
}