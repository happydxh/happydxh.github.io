# 打包js

## 安装

全局安装
```bash
npm install --global webpack
```
> 以上是全局安装webpack，一般我们在项目中更多的是使用本地安装

创建项目并本地安装webpack

```bash
mkdir webpack-demo01 && cd webpack-demo01
npm init -y
npm install webpack webpack-cli --save-dev
```

## 默认打包配置

安装好webpack后，我们将创建以下目录结构、文件和内容

```js
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
+   |- text.js
```

```js
// src/index.js
const src = require('./text')
console.log(src)
```

```js
// src/text.js
module.exports = '你好'
```

在index.html文件中引入src/index.js
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script src="./src/index.js"></script>
</body>
</html>
```

此时如果直接在浏览器中打开index.html，会发现控制台中报错，不支持CommonJS 模块语法
```js
// 报错信息
require is not defined
```

接下来我们对js进行打包，执行命令，webpack会执行默认的打包配置
```bash
npx webpack
```

会发现根目录中多了一个dist目录，并且dist目录中有我们打包后的main.js文件，打开main.js我们会发现代码经过了压缩，这是因为webpack默认将mode设置为`production`

我们修改index.html中引入js文件的路径，引入我们打包后的js文件
```html
- <script src="./src/index.js"></script>
+ <script src="./dist/main.js"></script>
```

此时我们在打开index.html，CommonJS 模块语法也能正常执行了

## 打包文件配置

以上运行`npx webpack`会运行默认的webpack配置，但一般我们都需要自定义自己的webpack配置文件，接下来我们就来建立自己的webpack配置

首先在新建文件`webpack.config.js`，写入我们自己的配置
```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // 使用开发模式
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // 出口，此处必须是绝对路径
  }
};
```

运行`npx webpack`
发现dist目录中生成了我们指定的`bundle.js`,并且因为设置了`mode`为`development`，`bundle.js`中的代码并没有进行压缩，我们在打包生产环境时，才会对代码进行压缩。

## 配置打包命令

以上我们都是通过运行`npx webpack`打包项目，npx 会自动查找当前依赖包中的可执行文件，我们也可以自行在package.json中配置我们的打包命令
```js
"scripts": {
  "build": "webpack"
}
```
运行`npm run build`执行一样的打包效果

## placeholders

- [ext] 目标文件/资源的文件扩展名
- [name] 文件/资源的基本名称
- [hash] 指定生成文件内容哈希值的哈希方法。
- [contenthash] contenthash: 代码不变则该生成的号码也不变

上面我们配置的打包出口的名字是固定的，我们可以通过配置placeholders来动态生成我们的打包文件名

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 给文件名加上hash
    path: path.resolve(__dirname, 'dist')
  }
};
```

给输出文件名加上`hash`以后，我们在运行`npm run build`,，会发现dist目录中会生成一个`bundle.b9f55737.js`文件

demo地址：[github](https://github.com/happydxh/webpack/tree/master/demo01)
