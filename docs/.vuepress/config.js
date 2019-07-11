const { themeConf } = require('./config/')
module.exports = {
  base: '',
  title: '想飞的博客',
  themeConfig: themeConf,
  plugins: [
    require('./plugins/my-router'),
    '@vuepress/back-to-top',
    [
      '@vuepress/google-analytics', { 'ga': 'UA-143666793-1' }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现页面有新内容",
          buttonText: "刷新"
        }
      }
    ]
  ] 
}