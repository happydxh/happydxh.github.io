const sidebar = require('./sidebar')

module.exports = {
  editLinks: false,
  docsDir: 'docs',
  lastUpdated: '更新于',
  serviceWorker: {
    updatePopup: true
  },
  sidebar,
  nav: [
    { text: '导航', link: '/guide/' },
    { 
      text: '大前端',
      items: [
        {
          text: '基础',
          items: [
            { text: 'JavaScript', link: '/passages/2019-07-09-js-context/' }
          ]
        }
      ]
    },
    { text: 'hooks', link: '/hooks/introduction' },
    { text: 'webpack', link: '/webpack/introduction' },
    { text: '工具', items: [
        { text: 'markdown语法', link: '/passages/2019-07-10-tool-markdown/' }
      ] 
    }
  ]
}
