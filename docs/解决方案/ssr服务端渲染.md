---
title: "ssr服务端渲染"
date: "2019-07-29"
permalink: "2019-07-29-ssr"
---

### SSR vs CSR vs 同构

首先我们先来了解三个概念
> SSR - `服务端渲染`，指后端服务器直接html字符串，让浏览器显示  
> CSR - `客户端渲染`，指使用js来渲染页面大部分内容，如react构建的`SPA`单页面应用  
> 同构 - `同构渲染`，指一套相同的代码在服务端执行一遍，然后在客户端又执行一遍  

### 服务端渲染
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
### 客户端渲染
##### 什么是客户端渲染
我们使用create-react-app脚手架创建一个项目，然后启动他，在浏览器上右键查看源代码，我们可以看到，我们可以看到index页面除了基本的页面结构，只有一个id为root的标签，并没有我们页面中看到的其他标签，那么我们看到的其他内容是那里来的呢，很明显是下面的script中拉取的js代码服务渲染的。
##### 客户端渲染的弊端
- 客户端渲染需要下载一堆js和css后才能渲染页面，首屏加载慢出现白屏问题
- 对于SEO，完全无能为力，因为搜索引擎爬虫只认识html结构的内容，而不能识别JS代码内容。

> 而客户端渲染的弊端恰恰就是服务端渲染的优势，ssr的出现就是为例解决客户端渲染的弊端