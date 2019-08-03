---
title: "ssr服务端渲染"
date: "2019-07-29"
permalink: "2019-07-29-ssr"
---

## SSR vs CSR vs 同构

首先我们先来了解三个概念
> SSR - `服务端渲染`，指后端服务器直接html字符串，让浏览器显示  
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
  </html>`;
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
##### 什么是客户端渲染
我们使用create-react-app脚手架创建一个项目，然后启动他，在浏览器上右键查看源代码，我们可以看到，我们可以看到index页面除了基本的页面结构，只有一个id为root的标签，并没有我们页面中看到的其他标签，那么我们看到的其他内容是那里来的呢，很明显是下面的script中拉取的js代码服务渲染的。
##### 客户端渲染的弊端
- 客户端渲染需要下载一堆js和css后才能渲染页面，首屏加载慢出现白屏问题
- 对于SEO，完全无能为力，因为搜索引擎爬虫只认识html结构的内容，而不能识别JS代码内容。

> 而客户端渲染的弊端恰恰就是服务端渲染的优势，ssr的出现就是为例解决客户端渲染的弊端

## react组件服务端渲染
前面我们实现了一个简单的服务端渲染的例子，通过koa服务返会一段html字符串给浏览器，起一个抛砖引玉的作用，但我们真正要实现的是如何通过react进行服务端渲染  

首先写一个简单的react组件
// Home.js
```js
import React from 'react';
const Home = () => {
  return (
    <>
      <div>This is home page</div>
      <button onClick={ () => { alert('click') } }>click</button>
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
      <button onClick={ () => { alert('click') } }>click</button>
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
      <script src="/index.js"></script>
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
const staticFile = require('koa-static');
import { renderToString } from 'react-dom/server';
import React from 'react';
import Home from '../containers/Home';

const app = new Koa();

// 静态资源服务
app.use(staticFile('public'));
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
      <button onClick={ go }>toList</button>
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
源码还是home页面的代码，并没有改变，这不是我们希望看到的这将不利于list页面的seo  

所以我们还得继续对服务端的路由进行处理，让路由代码在服务端再执行一遍，实现同构

服务端代码修改如下

```js
const Koa = require('koa');
const staticFile = require('koa-static');
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom'; 
import Routes from '../router'

const app = new Koa();

app.use(staticFile('public'));

app.use(async ctx => {
  // 关键的，我们使用了StaticRouter
  const content = renderToString(
    <StaticRouter location={ctx.request.url} >
      {Routes}
    </StaticRouter>
  );
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

这样当我们再次切换到list时，就能够看到list页面对应的源码了

## 同构redux

这一块，我们继续将redux引入我们的项目中，redux的概念我们不多说，快速的现在客户端将它搭建起来  

首先我们安装两个包

```bash
npm install react-redux redux -S
```

然后在创建一个redux,在里面放入

```js
// rudex/home.redux.js
const HOME_DATA = 'HOME_DATA'

const initState = {
  info: '这里是主页'
}

// reducer
export function home(state = initState, action) {
  switch (action.type) {
  case HOME_DATA:
    return { ...state, ...action.payload }
  default:
    return state
  }
}

// action
export function changeHomeData(homeData) {
  return { type: HOME_DATA, payload: homeData }
}
```

```js
// redux/index.js
// 组合器 合并所有reducer 并且返回 
import {createStore, combineReducers} from 'redux';
import { home } from './home.rudex'

const reducer = combineReducers({ home })

//导出创建的store
export default createStore(reducer)
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
// export default createStore(reducer)
export default () => createStore(reducer)
```
修改以后，这时在客户端和服务端引入的store就是一个函数，我们把store函数执行就可以得到一个新的store

```js
<Provider store={store()}>

</Provider>
```