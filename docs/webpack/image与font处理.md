# image与font处理

## 图片处理

如果我们的css或者`<img/>`中引入了图片链接，我们需要使用 file-loader 来处理

安装

```bash
npm install --save-dev file-loader
```

添加配置

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      ...
+     {
+       test: /\.(png|svg|jpg|gif)$/,
+       use: ['file-loader']
+     }
      ...
    ]
  }
}
```

然后在src目录下放进一张`face.png`图片，并在`index.js`中引入使用

```js
// src/index.js
  const src = require('./text')
+ import face from './face.png';
  import './index.css';
  import './index.less'

+ var myIcon = new Image();
+ myIcon.src = face;

+ document.body.appendChild(myIcon);

  console.log(src)
```

打包运行便可以图片正确的展示出来

有时候我们为了减少http请求，我们希望将图片打包成base64的形式使用，我们可以使用`url-loader`来进行处理

安装

```bash
npm i url-loader -D
```

修改配置

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      ...
-     {
-       test: /\.(png|svg|jpg|gif)$/,
-       use: ['file-loader']
-     },
+     {
+       test: /\.(png|jpg|gif)$/,
+       use: [
+         {
+           loader: 'url-loader',
+           options: {
+             name: 'static/media/[name].[hash:8].[ext]',
+             limit: '10000'
+           }
+         }
+       ]
+     }
      ...
    ]
  }
}
```

使用`url-loader`，并设置图片限制大小，这样当图片大小小于10kb时，图片便会打包成base64的格式，大于时会执行和`file-loader`一样的结果

## 字体处理

file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体

修改配置

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/font/[name].[hash:8].[ext]'
            }
          }
        ]
      }
      ...
    ]
  }
}
```

这样，在`src/font`文件中加入字体文件，使用即可，字体图标从`iconfont`下载

```css
/* index.css */
@font-face {font-family: "iconfont";
  src: url('./font/iconfont.eot?t=1566702302361'); /* IE9 */
  src: url('./font/iconfont.eot?t=1566702302361#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKgAAsAAAAABlAAAAJVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApcbwE2AiQDCAsGAAQgBYRtBzAblQXILrBt2JMiEdZ0Gv/seuO6xQAmQzz8t9//9pmZZ3O/qKPds2giv0SjJLOQKRFKJhTR0Fj3ai43ZbQ7PiyLrNAG9xK+zOXy4IpOs5GtkH1hOoENuG3yDFZedYU7asvyVIaNmvo8l9ObQAey+kA57kVjTT4MMN7WC2xPjCIrlMAbxi54gY8JVGtUys2Tq1uYUNirAvEkiTyYKEQVhRX6QrfhYIl4q6OfnqUf4E30/fjNjgmSTma33Bkeh7D3DackP7QPHgeEGAEd7yDjBCjEg8bsLcOCccNqdsQWOFZj8I22DTziqE7B/jq7fgSsQNUzqT3No9YnUJLRRWBj0lTSlPtTwzVqCn5VaXKTmk4dToVaRIa1MfVxTsn/J/tX5/8tflps109H2fJ30g7YA2iXP+c9UBC8aNM481vvNwV87fIgCrcrhvlBf1++4J+MKwoUrrWzqaCjPpAsTlqZUFW0QsEpg6m22Rsohr7Z2/D3rGbI+nbIwp6go3EZXX1XUB07Pd6YJgyLMsCRV4Aw4Q3JmC/IJvyShf1Dx5wWXRMxjOpRLF/Y2Itk6lCQJylEv49JwEvmeuVU3HhNUZN7Iq+N+HsSdZJA6+x8uXBKJYklttSdyJaSIRO8wBPwHOU5x0rwlAKpx1JWG8a5YdOb9IAXMOUGgXgkEkK+PpQIcCUWdJamKp+/RiKNnEd0yOrK94hQSyZHFp05gDw1lYNkj/JKrSNikyQGMQJXQCdgHsnlOFQ1z0uRgKSLJ6QrGwynHRtq0re3FD+wCyrbnsKZlXWfxrzpEwAA') format('woff2'),
  url('./font/iconfont.woff?t=1566702302361') format('woff'),
  url('./font/iconfont.ttf?t=1566702302361') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./font/iconfont.svg?t=1566702302361#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-icon-bi-shouye:before {
  content: "\e62a";
}
```

```js
  // index.js
  const src = require('./text')
  import face from './face.png';
  import abc from './abc.png'
  import './index.css';
  import './index.less'

+ var root = document.getElementById('root')

+ root.innerHTML = '<div class="iconfont el-icon-bi-shouye"></div>'

  var myIcon = new Image();
  myIcon.src = face;

  document.body.appendChild(myIcon);

  console.log(src)
```

demo地址：[github](https://github.com/happydxh/webpack/tree/master/demo04)
