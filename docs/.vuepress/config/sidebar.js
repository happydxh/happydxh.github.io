const hooks = [
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
]

const webpack = [
  {
    title: 'webpack',
    collapsable: false,
    children: [
      'introduction'
    ]
  }
]


const frontend = [
  {
    title: 'JavaScript',
    children: [
      'js/js执行上下文',
      'js/this指向'
    ]
  }
]

const tool = [
  'markdown',
  'git'
]

module.exports = {
  '/hooks/': hooks,
  '/webpack/': webpack,
  '/大前端/': frontend,
  '/工具/': tool
}