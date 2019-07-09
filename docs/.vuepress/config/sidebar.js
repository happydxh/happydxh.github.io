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
      'js/this指向'
    ]
  }
]

module.exports = {
  '/hooks/': hooks,
  '/webpack/': webpack,
  '/大前端/': frontend
}