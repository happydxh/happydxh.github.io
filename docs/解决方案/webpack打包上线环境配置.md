---
title: "webpack打包上线环境配置"
date: "2019-07-11"
permalink: "2019-07-11-solution-webpack-env"
---

#### 配置目标：设置自定义环境变量，使项目打包后自动连接后端（生产，灰度，正式）环境的接口
##### 步骤一
使用cross-env 来设置环境 
```bash
npm i -D cross-env 
```

设置打包命令（这里以create-react-app脚手架为例, vue-cli配置类似）  在原有的基础上加入（cross-env ENV=dev）环境配置，注意环境配置应放在执行
webpack之前，这里的环境和webpack里面的mode中配置的开发和生产环境要区分开，你可以把它看作是同一静态资源服务器下的不同模式（dev、test、gray、prod）

```json
"scripts": {
  "start": "cross-env ENV=dev node scripts/start.js",
  "test": "cross-env ENV=test node scripts/build.js",
  "gray": "cross-env ENV=gray node scripts/build.js",
  "build": "cross-env ENV=prod node scripts/build.js"
 }
```
##### 步骤二

创建一个全局变量  
在webpack.config.js中找到webpack自带的插件DefinePlugin，将其修改为

```js
// webpack.config.js
new webpack.DefinePlugin({
  "process.env": {
    ENV: JSON.stringify(process.env.ENV)
  }
})
```
##### 说明：
1 、react脚手架将生产和开发环境的配置项写在了一个文件中，通过变量来区分配置生 产和开发的具体配置项，此处没有判断环境就是开发和生产环境配置项中都要配置   
2、vue-cli2脚手架中需要将该项配置移入webpack.base.conf.js中，并删除webpack.de v.conf.js和webpack.prod.conf.js中的这个插件  
3、vue-cli3中，则在vue.config.js中通过chainWebpack链式写法修改DefinePlugin配 置

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        args[0]['process.env'] = {
          ENV: JSON.stringify(process.env.ENV)
        }
        return args
      })
  }
}
```
##### 步骤三

全局变量有了之后，拿到该变量去执行对应的服务端域名就可以

```js
// http.js
if (process.env.ENV === 'dev') { // 本地
  api = 'https://www.devmock.com'
} else if (process.env.ENV === 'test') { // 测试
  api = 'https://www.testmock.com'
} else if (process.env.ENV === 'gray') { // 灰度
  api = 'https://www.graymock.com'
} else if (process.env.ENV === 'prod') { // 正式
  api = 'https://www.prodmock.com'
}
```
##### 步骤四
打包
```js
npm start     启动项目连接dev环境  
npm run test  打包测试环境  
npm run gray  打包灰度环境  
npm run build 打包正式环境
```

