// Inside vue.config.js
module.exports = {
  publicPath: '/saxtile/',
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Saxtile',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}