// Inside vue.config.js
module.exports = {
	publicPath: '/saxtile/',
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Saxtile',
    themeColor: '#00adb5',
    msTileColor: '#eeeeee',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}