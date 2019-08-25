# es6转换

JavaScript 与服务器语言不同，它没有办法保证对每个用户都有相同的支持，由于每个用户所使用的浏览器不同，对JavaScript语法的支持程度就会不同，尤其对一些最新的语法，如果开发人员想要使用新语法（例如 class A {}），这在一些旧的浏览器上就会报错从而导致页面空白等问题

为了做到对各种浏览器的语法支持，产生了babel，babel为开发人员的语法做了向后兼容的处理，将一些最新的语法转换成浏览器可以识别的语法

## es6 转 es5

我们首先在`index.js`中加一段es6的语法
```js
// src/index.js
const fn = () => {
  console.log('箭头函数')
}

fn()
```

然后打包，在打包后的`bundle.3c28f359.js`文件中，我们可以查到这段代码，它还是es6的写法，这在一些低版本的浏览器中会发生错误，现在我们需要使用`babel`来将上面的箭头函数转化成普通的函数

安装babel
```bash
npm install --save-dev @babel/core babel-loader @babel/preset-env
```
- @babel/core  —— 为babel的核心模块  
- @babel/preset-env —— es6 转 es5

然后在配置文件中添加配置
```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      ...
+     {
+       test: /\.js?$/,
+       exclude: /node_modules/, // 尽可能少的在模块上运用loader,提高打包速度
+       include: path.resolve(__dirname, 'src'),
+       use: ['babel-loader']
+     }
      ...
    ]
  }
}
```

添加babel配置文件`.babelrc`放在根目录下
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { // 
          "safari": "11.1",
          "firefox": "60",
          "edge": "17",
          "chrome": "67",
          "ie": 8
        }
      }
    ]
  ]
}
```

通过以上的配置，通过`npm run build`打包，我们会发现打包后的`bundle.3c28f359.js`文件中，箭头函数已经被转换成了普通函数

## polyfill

通过上面的配置我们可以将es6转换成es5，但对于一些新的内函数（Promise 或 WeakMap）或者像Array.prototype.includes 这样的实例方法还是不能在一些浏览器中不能使用，这是我们需要使用`polyfill`来对代码做转换

`polyfill`的使用方式

- 全局引入
- 动态补丁polyfill.io
- 设置 `useBuiltIns` 按需加载

安装
```bash
npm install --save @babel/polyfill
```

安装好@babel/polyfill

全局引入只需在项目入口出引入即可
```js
require("@babel/polyfill");
```

动态引入：[polyfill.io](https://polyfill.io/v3/url-builder/)

第三种配置按需加载

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "safari": "11.1",
          "firefox": "60",
          "edge": "17",
          "chrome": "67",
          "ie": 8
        },
+       "useBuiltIns": "usage", // 按需加载polyfill
+       "corejs": 2
      }
    ]
  ]
}
```

当我们把`useBuiltIns`设置成`usage`时实际上是对第一种全局引入的优化，它会按需引入你需要的 polyfill

## 废弃掉stage-x

Babel 7的改动还是不少的，一个比较大的改动在于移除了之前的stage-x插件，在以前每个stage-x插件事实上就是集合这个阶段中几种特性转译的插件，现在废弃掉stage-x，一些插件就需要我们自己手动安装

比如`@babel/plugin-proposal-decorators`、`@babel/plugin-proposal-class-properties`插件对装饰器语法和class的支持

在`src/index.js`中加入下面代码
```js
// src/index.js
@log
class A {
  a = 1
}
let a = new A()
console.log(a.a)

function log(target) {
  console.log(target, '----')
}
```

安装插件
```bash
npm install @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```

然后在`.babelrc`中加入配置
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "safari": "11.1",
          "firefox": "60",
          "edge": "17",
          "chrome": "67",
          "ie": 8
        },
        "useBuiltIns": "usage", // 按需加载polyfill
        "corejs": 2
      }
    ]
  ],
+ "plugins": [
+   ["@babel/plugin-proposal-decorators", { "legacy": true }],
+   ["@babel/plugin-proposal-class-properties", { "loose": true }]
+ ]
}
```

通过添加插件，我们便可以支持装饰器和类属性的写法

demo地址：[github](https://github.com/happydxh/webpack/tree/master/demo05)





