const sidebar = require('./sidebar')

module.exports = {
  repo: 'https://github.com/happydxh/happydxh.github.io',
  docsDir: 'docs',
  // editLinks: true,
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
    {
      text: '工具',
      items: [
        { text: 'markdown语法', link: '/passages/2019-07-10-tool-markdown/' },
        { text: 'git', link: '/passages/2019-07-10-tool-git/' },
        { text: 'nvm和nrm', link: '/passages/2019-11-05-tool-nvm-mrm/' },
        { text: 'Travis Ci', link: '/passages/2019-08-04-travis-ci/' }
      ] 
    },
    {
      text: '解决方案',
      items: [
        { text: 'webpack打包上线环境配置', link: '/passages/2019-07-11-solution-webpack-env/' },
        { text: 'ssr服务端渲染', link: '/passages/2019-07-29-ssr/' }
      ] 
    },
    { text: 'hooks', link: '/hooks/introduction' },
    { text: 'webpack', link: '/webpack/introduction' },
    {
      text: '随手记',
      items: [
        { text: '言摘文摘', link: '/passages/2019-08-11-wen/' },
        { text: '晚间乌云', link: '/passages/2019-08-11-yun/' }
      ] 
    },
    { text: '关于', link: '/about/' }
  ]
}
