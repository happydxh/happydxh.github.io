module.exports = {
  base: '',
  title: '想飞的博客',
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'hooks', link: '/hooks/introduction' },
      { text: 'webpack', link: '/webpack/introduction' }
    ],
    sidebar: {
      '/hooks/': [
        {
          title: 'hooks',
          collapsable: false,
          children: [
            'introduction',
            'useState',
            'useEffect',
            'rule',
            'custom',
            'useContext',
            'useRef',
            'useMemo',
            'useReducer',
            'yourHooks',
          ]
        }
      ],
      '/webpack/': [
        {
          title: 'webpack',
          collapsable: false,
          children: [
            'introduction'
          ]
        }
      ]
    }
  },
  plugins: ['@vuepress/back-to-top'] 
}