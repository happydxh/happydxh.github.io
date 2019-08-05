---
title: "ssr服务端渲染"
date: "2019-07-29"
permalink: "2019-07-29-ssr"
---

项目地址：[github](https://github.com/happydxh/react-ssr)

## SSR vs CSR vs 同构

首先我们先来了解三个概念
> SSR - `服务端渲染`，指后端服务器直接返回html字符串，让浏览器显示  
> CSR - `客户端渲染`，指使用js来渲染页面大部分内容，如react构建的`SPA`单页面应用  
> 同构 - `同构渲染`，指一套相同的代码在服务端执行一遍，然后在客户端又执行一遍  

## 服务端渲染
什么是服务端渲染，首先我们来看一个简单的列子，来直观的感受一下服务端渲染
```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 
  `<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <h1>hello</h1>
      <p>world</p>
    </body>
  </html>`
});

app.listen(8888, (err) => {
  if (err) throw err
  console.log('localhost:8888')
})
```
启动之后打开localhost:8888可以看到页面显示了hello world。而且打开网页源代码可以看到
```html
<html>
  <head>
    <title>hello</title>
  </head>
  <body>
    <h1>hello</h1>
    <p>world</p>
  </body>
</html>
```
这就是服务端渲染，服务端返回给浏览器一段字符串供浏览器显示，所有标签和内容都可以在源代码中查看到，供搜索引擎爬虫识别

## 客户端渲染
#### 什么是客户端渲染
我们使用create-react-app脚手架创建一个项目，然后启动他，在浏览器上右键查看源代码，我们可以看到index页面除了基本的页面结构，只有一个id为root的标签，并没有多于的DOM标签，那么我们看到的其他内容是从那里来的呢，很明显是下面script拉取的js代码来执行渲染的。
#### 客户端渲染的弊端
- 客户端渲染需要下载一堆js和css后才能渲染页面，首屏加载慢出现白屏问题
- 对于SEO，完全无能为力，因为搜索引擎爬虫只认识html结构的内容，而不能识别JS代码内容。

> 而客户端渲染的弊端恰恰就是服务端渲染的优势，ssr的出现就是为例解决客户端渲染的弊端

## react组件服务端渲染
前面我们实现了一个简单的服务端渲染的例子，通过koa服务返会一段html字符串给浏览器，起一个抛砖引玉的作用，但我们真正要实现的是如何通过react进行服务端渲染  

首先写一个简单的react组件

```js
// Home.js
import React from 'react';
const Home = () => {
  return (
    <>
      <div>This is home page</div>
    </>
  )
}
export default Home
```
有了一个react组件，接下来我们需要将组件转成html字符串，然后通过koa服务返回给浏览器  

服务端代码如下
```js
// app.js
const Koa = require('koa');
import { renderToString } from 'react-dom/server';
import React from 'react';
import Home from './Home';
// 通过执行Home()你可以看到一个虚拟DOM
const app = new Koa();
// 编译虚拟DOM的方法
const content = renderToString(<Home />);
console.log(content)
app.use(async ctx => {
  ctx.body = 
  `<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <div id="root">${content}</div>
    </body>
  </html>`;
});

app.listen(8888, (err) => {
  if (err) throw err
  console.log('localhost:8888')
})
```
如若我们直接node app.js执行上面服务，会发生错误，因为服务端node并不支持es6模块的引入写法，还有react、async等的写法都没有支持，所有我们需要使用webpackd对上述代码做一个简单的处理
```js
// webpack.config.js
const path = require('path')
module.exports = {
  target: 'node',
  mode: 'development',
  entry: ['@babel/polyfill', './app.js'],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-react',  ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions']
          }
        }]]
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
```
```json
// package.json
{
  "name": "react-ssr-koa",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack && node build/bundle.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/polyfill": "^7.4.4",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "webpack": "^4.38.0",
    "webpack-cli": "^3.3.6"
  },
  "dependencies": {
    "koa": "^2.7.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
}
```
这是执行命令`npm run dev`打开`http://localhost:8888/`便可以看到react组件对应的页面内容，右键查看源代码也可以看到对应的标签内容

## 同构
上面我们虽然实现了react组件的服务端渲染，但却只是实现了页面内容的服务端渲染，页面的交互行为却并未生效
```js
  import React from 'react';
  const Home = () => {
    return (
      <>
        <div>This is home page</div>
+      <button onClick={ () => { alert('click') } }>click</button>
      </>
    )
  }
  export default Home
```
上面我们在react组件中新加了一个点击事件，重新运行，我们点击按钮，发现并没有起任何作用，这是因为react-dom/server的renderToString并没有做相关事件的处理，只是把虚拟DOM转成了真实的html字符串，我们可以打印一下renderToString返回content的内容
```js
<div>This is home page</div><button>click</button>
```
可以看到，并没有事件绑定  

出现问题就要解决问题，要解决事件绑定的问题，就需要同构，同构我们在一开始就说过，所谓同构就是指一套相同的代码在服务端执行一遍，然后在客户端又执行一遍，服务端渲染完成页面结构，浏览器端渲染完成事件绑定

而我们想要浏览器端再执行一遍react代码，唯一的方式就是让浏览器主动加载react代码文件，让js再执行一次渲染。我们对服务端的代码先做一点更改
```js
app.use(async ctx => {
  ctx.body = 
  `<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <div id="root">${content}</div>
+     <script src="/index.js"></script>
    </body>
  </html>`;
});
```
可以看到，我们在返回给浏览器中的字符串中，新加了一个script标签来加载js文件，这个js文件就是我们react项目中常见的打包的主文件  

接下来我们要做的就是打包如何得到这个文件，其实和我们平时写react单页工程是一样的
```js
// client/index. js
import React from 'react';
import ReactDom from 'react-dom';
import Home from '../containers/Home';

ReactDom.hydrate(<Home />, document.getElementById('root'))
```
不同的是将ReactDOM.render()换成ReactDom.hydrate()混合服务端渲染  

然后我们使用webpack将该react项目进行打包，输入index.js文件
```js
// webpack.client.js
const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const clientConfig = {
  mode: 'development',
  entry: ['./src/client/index.js'],
  module: {},
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge(config, clientConfig)

// webpack.base.js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-react',  ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions']
          }
        }]]
      }
    }]
  }
}

// package.json的script部分
"scripts": {
  "dev": "npm-run-all --parallel dev:**", // 同步执行 dev:build:server dev:build:client dev:start
  "dev:build:server": "webpack --config webpack.server.js --watch", // 执行服务端配置并监听
  "dev:build:client": "webpack --config webpack.client.js --watch", // 执行客户端配置并监听
  "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"" // 监听 build目录并执行node
}
```

打包的文件进入到public目录中，因为我们需要加载该目录中的index.js文件，所有我们需要将该目录设置成静态资源服务的目录  

完整的服务端代码如下
```js
  const Koa = require('koa');
+ const staticFile = require('koa-static');
  import { renderToString } from 'react-dom/server';
  import React from 'react';
  import Home from '../containers/Home';

  const app = new Koa();

  // 静态资源服务
+ app.use(staticFile('public'));
  const content = renderToString(<Home />);
  app.use(async ctx => {
    ctx.body = 
    `<html>
      <head>
        <title>hello</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>`;
  });

  app.listen(8888, (err) => {
    if (err) throw err
    console.log('localhost:8888')
  })
```

至此，我们就实现了同构，绑定事件完成

## 同构路由

完成了上面的简单同构之后，我们接来下继续在我们的项目中引入路由，首先是客户端，客户端路由的写法和我们平时写路由是一样的

我们先新建一个list页面
```js
// containers/List.js
import React from 'react'

export default function List() {
  return (
    <div>
      这里是list
    </div>
  )
}
```

新增一个router.js文件来处理路由
```js
import React from 'react';
import { Route } from 'react-router-dom'
import Home from './containers/Home';
import List from './containers/List'

export default (
  <>
    <Route path='/' exact component={Home}></Route>
    <Route path='/list' exact component={List}></Route>
  </>
)
```

然后修改一下我们客户端的主文件
```js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Routes from '../router'

const App = () => {
  return (
    <BrowserRouter>
      {Routes}
    </BrowserRouter>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
```
这样客户端的路由便做好了，我们在Home页面中新增一个按钮跳转到List页面
```js
  import React from 'react';
  const Home = (props) => {
    const go = () => {
      props.history.push('/list')
    }
    return (
      <>
        <div>This is home page</div>
        <button onClick={ () => { alert('click') } }>click</button>
+       <button onClick={ go }>toList</button>
      </>
    )
  }
  export default Home
```
点击toList按钮，我们如愿的跳转到了list，完成了路由跳转，但我们右键打开源代码查看，却发现
```html
<html>
  <head>
    <title>hello</title>
  </head>
  <body>
    <div id="root"><div>This is home page</div><button>click</button><button>toList</button></div>
    <script src="/index.js"></script>
  </body>
</html>
```
源码还是home页面的代码，并没有改变，这不是我们希望看到的，这样将不利于list页面的seo  

所以我们还得继续对服务端的路由进行处理，让路由代码在服务端再执行一遍，实现同构

服务端代码修改如下

```js
  const Koa = require('koa');
  const staticFile = require('koa-static');
  import { renderToString } from 'react-dom/server';
  import React from 'react';
+ import { StaticRouter } from 'react-router-dom'; 
+ import Routes from '../router'

  const app = new Koa();

  app.use(staticFile('public'));

  app.use(async ctx => {
    // 关键的，我们使用了StaticRouter
—   const content = renderToString(<Home />)
+   const content = renderToString(
+     <StaticRouter location={ctx.request.url} >
+        {Routes}
+     </StaticRouter>
+   )
    ctx.body = 
    `<html>
      <head>
        <title>hello</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>`
  });

  app.listen(8888, (err) => {
    if (err) throw err
    console.log('localhost:8888')
  })
```

这样当我们再次切换到list时，就能够看到list页面对应的源码了

## 同构redux

这一块，我们继续将redux引入我们的项目中，redux的概念我们不多说，快速的现在客户端将它搭建起来  

首先我们安装依赖包

```bash
npm install react-redux redux redux-thunk -S
```

然后在创建一个redux目录,在里面放入

```js
// rudex/home.redux.js
import axios from 'axios'

const CHANGE_INFO = 'CHANGE_INFO'

const initState = {
  info: '这里是主页'
}

// reducer
export function home(state = initState, action) {
  switch (action.type) {
    case CHANGE_INFO:
      return { ...state, info: action.info }
    default:
      return state
  }
}

// action
export function changeInfo(info) {
  return { type: CHANGE_INFO, info }
}
```

```js
// 组合器 合并所有reducer 并且返回 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { home } from './home.rudex'

const reducer = combineReducers({ home })

// 导出创建的store
export default createStore(reducer, applyMiddleware(thunk))
```

然后将redux/index.js中的store分别引入到客户端和服务端中去

客户端
```js
import { Provider } from 'react-redux';
import store from '../redux'

<Provider store={store}>
  <BrowserRouter>
    {Routes}
  </BrowserRouter>
</Provider>
```

服务端
```js
import { Provider } from 'react-redux';
import store from '../redux'

const content = renderToString(
  <Provider store={store}>
    <StaticRouter location={ctx.request.url} >
      {Routes}
    </StaticRouter>
  </Provider>
)
```

两者引入方式相同，都是通过Provider引入，到这里同构中引入redux基本完成，但是这里还存在一个潜在的问题，就是上面`redux/index.js`中的`store`是直接导出的，这样在客户端引用的时候是不会出现问题，但是在服务端的代码是给所有用户使用的，这样会导致所有用户共用一个store

对`redux/index.js`中做如下修改
```js
// 导出创建的store
// 这种写法在客户端可取，但在服务器端会导致所有用户共用了同一个状态
// export default createStore(reducer, applyMiddleware(thunk))
export default () => createStore(reducer, applyMiddleware(thunk))
```
修改以后，这时在客户端和服务端引入的store就是一个函数，我们把store函数执行就可以得到一个新的store

```js
<Provider store={store()}>

</Provider>
```

## 异步数据获取

#### 客户端获取数据

我们在react单页运用开发中，经常会在生命周期`componentDidMount`中请求接口来获取服务端的数据，但是在服务端渲染中这样请求数据却会出现问题

我们需要异步获取数据，首先对redux做一点修改，引入redux-thunk相关逻辑
```js
// redux/home.redux.js 修改
+ import axios from 'axios'

  const CHANGE_INFO = 'CHANGE_INFO'
+ const CHANGE_LIST = 'CHANGE_LIST'

  const initState = {
    info: '这里是主页',
+   list: []
  }

  // reducer
  export function home(state = initState, action) {
    switch (action.type) {
      case CHANGE_INFO:
        return { ...state, info: action.info }
+     case CHANGE_LIST:
+       return { ...state, list: action.list }
      default:
        return state
    }
  }

  // action
  export function changeInfo(info) {
    return { type: CHANGE_INFO, info }
  }

+ export function changeList(list) {
+   return { type: CHANGE_LIST, list }
+ }

  // redux-thunk
+ export const getHomeList = () => {
+  return ( dispatch, getState ) => {
+    return axios.get('http://localhost:9999/list').then(res => {
+      const list = res.data
+      dispatch(changeList(list))
+    })
+  }
+ }
```

在修改home.redux.js文件后，我们看到我们新增了一个异步获取数据的方法`getHomeList`，它请求了一个接口，接口是我们在根目录下开起了另外一个koa服务模拟的
```js
// server.js
const Koa = require('koa')
const router = require('koa-router')()
const cors = require('koa-cors')

const app = new Koa()

app.use(cors({
  maxAge: 3600
}))

router.get('/list', (ctx, next) => {
  ctx.body = ['看书', '写字', '听歌']
  next()
})

// 启动路由
app.use(router.routes())

app.listen(9999, (err) => {
  if (err) throw err
  console.log('localhost:9999')
})
```

然后在package.json的`scripts`中新增启动服务命令
```bash
"dev:server": "nodemon server.js"
```
这样我们在使用npm run dev启动项目的时候，顺带也会将server.js的服务启动


然后我们在Home组件的`componentDidMount`调用getHomeList，并将获取的数据循环渲染出来
```js
componentDidMount() {
  props.getHomeList()
}
```
我们可以看到，接口请求成功，并且页面上的数据也渲染了出来，但当我们右键查看源代码时，却并没有发现相对应的标签，这是为什么呢  

让我们来分析一下户端和服务端的运行流程，浏览器执行请求时，服务端接收到请求，这时服务端的store是空的，并向浏览器端输出html模版，浏览器端接口html字符串并下载js执行，这是浏览器端的store也是空的，当执行到`componentDidMount`请求getHomeList后，浏览器端的store有了数据，但是服务器端的`componentDidMount`确始终不会执行，服务端的store依旧是空的，所有源代码不会出现我们想看到的标签  

接下来我们的任务就是让获取数据的操作在服务端执行，并在服务端渲染

#### 服务端获取数据

要达到获取数据的操作在服务端执行，我们需要先将路由改造一下

```js
// router.js
import Home from './containers/Home';
import List from './containers/List'

export default [
  {
    path: "/",
    component: Home,
    exact: true,
    loadData: Home.loadData, // 服务端获取异步数据的函数
    key: 'home'
  },
  {
    path: '/list',
    component: List,
    exact: true,
    key: 'list'
  }
]
```

客户端和服务端引入路由的方式也需要相应的改变

客户端
```js
import { renderRoutes } from 'react-router-config'
// 引入react-router-config的renderRoutes函数来对路由的配置信息做解析渲染
<Provider store={store}>
  <BrowserRouter>
    <Switch>
      {
        renderRoutes(routeConfig)
      }
    </Switch>
  </BrowserRouter>
</Provider>
```
服务端
```js
import { renderRoutes } from 'react-router-config'
// 引入react-router-config的renderRoutes函数来对路由的配置信息做解析渲染
<Provider store={store}>
  <StaticRouter location={ctx.request.url}>
    <Switch>{renderRoutes(routeConfig)}</Switch>
  </StaticRouter>
</Provider>
```

我们在router.js的路由配置数据中，配置了一个loadData函数，这个参数代表了在服务端获取数据的函数，现在我们的目标就是如何让这个函数在服务端执行，并且要针对不同路由组件匹配不用的loadData函数

```js
app.use(async ctx => {
  const store = getStore();
  // 调用matchRoutes用来匹配当前路由(支持多级路由)
  const matchedRoutes = matchRoutes(routeConfig, ctx.request.url);
  const promises = [];
  matchedRoutes.forEach(item => {
    // 如果这个路由对应的组件有loadData方法
    if (item.route.loadData) {
      // 那么就执行一次, 并将store传进去
      // loadData函数调用后需要返回Promise对象
      promises.push(item.route.loadData(store));
    };
  });
  await Promise.all(promises)

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.request.url}>
        <Switch>{renderRoutes(routeConfig)}</Switch>
      </StaticRouter>
    </Provider>
  )
  ctx.body = `<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${JSON.stringify(store.getState())}
        }
      </script>
      <script src="/index.js"></script>
    </body>
  </html>`
})
```

经过上面的处理，我们就可以在组件中调用loadData函数了
```js
Home.loadData = store => {
  return store.dispatch(getHomeList())
}
```

这样服务端渲染中异步获取数据就完成了，然而，解决了这个问题之后，另一个问题又来了

## 数据的 脱水 和 注水

如果我们将客户端`componentDidMount`中获取数据的代码注释掉会发现，现在页面中不会有数据，但是源码码中却有数据。这是为什么？

我们来分析一下，源码中有数据，说明服务端中的store已经注入来数据，而客户端没有渲染出来，是因为服务端没有把数据同步给客户端，同时`componentDidMount`中请求接口的代码我们又注释掉了，这时客户端中的store依旧是空的

那如何才能让这两个store的数据同步变化呢?

解决这个问题的流程，其实就是数据的 `脱水` 和 `注水`

在服务端，拿到数据更新store后，在服务器端响应页面HTML的时候，将store中的数据一并传递给浏览器，这叫`脱水`
```js
  ctx.body = `<html>
    <head>
      <title>hello</title>
    </head>
    <body>
      <div id="root">${content}</div>
+     <script>
+       window.context = {
+         state: ${JSON.stringify(store.getState())}
+       }
+     </script>
      <script src="/index.js"></script>
    </body>
  </html>`
```

然后在客户端，接收到服务端发送过来的页面后，就可以在`window`对象上获取store中的数据
```js
// redux/index.js
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
  // 从服务器端输出的页面上拿到脱水的数据
  const defaultState = window.context ? window.context.state : {}
  // 当做 store的初始数据（即注水）
  return createStore(reducer, defaultState, applyMiddleware(thunk))
}
```

到这里数据的 脱水 和 注水也已经完成，但是还有一点小问题，就当服务端获取数据，并将数据传给客户端后，客户端其实是不需要再进行数据请求的，这是我们做一些小处理，便可以规避此问题

```js
componentDidMount() {
  // 如果props.list中已经有数据了，我们就不再请求
  if (!props.list.length) {
    props.getHomeList()
  }
}
```