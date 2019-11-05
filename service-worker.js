/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a7100540c7d3eeccb9bdd377be029a0a"
  },
  {
    "url": "about/index.html",
    "revision": "36233412b1f56b90076de4035ba13d58"
  },
  {
    "url": "assets/css/0.styles.9f5fedfb.css",
    "revision": "ce6d35e6ea70459c56c84ddbfa1e5cfe"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8e29ffc8.js",
    "revision": "4828edd93cbd81859490667ec95a6e74"
  },
  {
    "url": "assets/js/11.2c274561.js",
    "revision": "3fd1dde239a0d84b6f515a09da804e37"
  },
  {
    "url": "assets/js/12.71c7899f.js",
    "revision": "bd73856e5214bb0e4834a31d792d0ffa"
  },
  {
    "url": "assets/js/13.07e578d9.js",
    "revision": "b1c7744baf726a47e3ce9cd38a01242b"
  },
  {
    "url": "assets/js/14.6002bb1e.js",
    "revision": "4b471bb4588cee0536e17330e34eeab5"
  },
  {
    "url": "assets/js/15.6436defe.js",
    "revision": "efce78f39969900ef3ddb87e162f3c64"
  },
  {
    "url": "assets/js/16.199e67df.js",
    "revision": "3184ed6e29fa50dfcb22a41ef95d8bfd"
  },
  {
    "url": "assets/js/17.5de884d9.js",
    "revision": "88001da5f5950084a4e4ddc8dcffaa68"
  },
  {
    "url": "assets/js/18.79d42d7b.js",
    "revision": "bbe16533ab11a944b5780029901d8777"
  },
  {
    "url": "assets/js/19.e176ec19.js",
    "revision": "8cbc79418d2e917a22c8b01c06d3c0be"
  },
  {
    "url": "assets/js/2.22f6b1d1.js",
    "revision": "271a675dac968ae4993a4b8327188fc9"
  },
  {
    "url": "assets/js/20.4cbea216.js",
    "revision": "308f7d8b36983d6e44928632a6753839"
  },
  {
    "url": "assets/js/21.690fb409.js",
    "revision": "d671322239f560707db46a2326caffb3"
  },
  {
    "url": "assets/js/22.ab6a9e8d.js",
    "revision": "37df9149e15f87a7f0621317c6e9d23b"
  },
  {
    "url": "assets/js/23.96e55113.js",
    "revision": "e5ea022fba4530db333bda5a98ab3ce1"
  },
  {
    "url": "assets/js/24.ada615e3.js",
    "revision": "2c78acfeef9cd46f89264c6230f98760"
  },
  {
    "url": "assets/js/25.faeb28c9.js",
    "revision": "f947eea361b4482a2b8516fd82461fee"
  },
  {
    "url": "assets/js/26.27579601.js",
    "revision": "b1a5d0657bf73781642dfd0f49721490"
  },
  {
    "url": "assets/js/27.e8350cd0.js",
    "revision": "a4c5fe668a3edbf68958a567ad453659"
  },
  {
    "url": "assets/js/28.63885741.js",
    "revision": "790360892dd409dcc05fcb8698d67463"
  },
  {
    "url": "assets/js/29.fd0107e4.js",
    "revision": "b9d07cdb5f3ac06d02c2776c28ed070d"
  },
  {
    "url": "assets/js/3.5e21b91e.js",
    "revision": "fdf1a478dc3d188dd36bf63dd4e04849"
  },
  {
    "url": "assets/js/30.55202181.js",
    "revision": "37388a6909c2951abd442c8f4fe2accc"
  },
  {
    "url": "assets/js/31.9028f997.js",
    "revision": "7a2bf45be999c81457bca59c0ee605c1"
  },
  {
    "url": "assets/js/32.79821171.js",
    "revision": "a5babe613544ea3800b1360a6a9e2e48"
  },
  {
    "url": "assets/js/33.c990f409.js",
    "revision": "ffe12240328569a83b4452680430a10e"
  },
  {
    "url": "assets/js/34.4593a27f.js",
    "revision": "bd016becf17ff18b7aded0dfd52632b1"
  },
  {
    "url": "assets/js/35.171512bd.js",
    "revision": "0441f8e99d3951a9c2524ebdc20187cd"
  },
  {
    "url": "assets/js/4.c7ccbd4c.js",
    "revision": "5d9a7733bbfeb33dc4917d4b12cec937"
  },
  {
    "url": "assets/js/5.b3597586.js",
    "revision": "4cb57eb5136e5704ed782ad8dba78263"
  },
  {
    "url": "assets/js/6.264b5b0b.js",
    "revision": "0b5fe6b82e93ec773e7d7939d993232f"
  },
  {
    "url": "assets/js/7.5430b290.js",
    "revision": "ea7f05b5dec4efc8fc07578cf500e060"
  },
  {
    "url": "assets/js/8.ad4bbf50.js",
    "revision": "609dbfcd019618ba8d676cf0e9e43f72"
  },
  {
    "url": "assets/js/9.14f7ae1f.js",
    "revision": "07ba0f7bd91a080162fdb2b4262c71b0"
  },
  {
    "url": "assets/js/app.66620904.js",
    "revision": "8ebfe31d01cb971343accc795ebc09ad"
  },
  {
    "url": "context.jpeg",
    "revision": "87d31815b5bcbf332bb46c2c5ab8408e"
  },
  {
    "url": "fly.png",
    "revision": "c3c6c1886a211dccafbe5ddad8dc9a1d"
  },
  {
    "url": "git.png",
    "revision": "2a4ede0d8c1bce0504d19aeaa3e86e4b"
  },
  {
    "url": "guide/index.html",
    "revision": "34d4f52cfb5b30d7990b920b2ebaef04"
  },
  {
    "url": "hooks/custom.html",
    "revision": "de30121b854d127b8936380eaaafa45f"
  },
  {
    "url": "hooks/introduction.html",
    "revision": "a318d322b31fa201074938b47eb2d149"
  },
  {
    "url": "hooks/rule.html",
    "revision": "467be94b6ab851edd7d8384ba01e8b28"
  },
  {
    "url": "hooks/useContext.html",
    "revision": "ef6b6ba38586f3a3580b8f75821b5a4a"
  },
  {
    "url": "hooks/useEffect.html",
    "revision": "5f79a8cd7d8c6b694f4bd2e1d5c5bb1a"
  },
  {
    "url": "hooks/useMemo.html",
    "revision": "41de05d1597225d1a65b302b907c04dd"
  },
  {
    "url": "hooks/useReducer.html",
    "revision": "c56131f3b80167e299610328fd39c4d8"
  },
  {
    "url": "hooks/useRef.html",
    "revision": "eddecbc4acb52b8f69d6808c9a5af4be"
  },
  {
    "url": "hooks/useState.html",
    "revision": "e1157af393be13f3783e3860af34e9e3"
  },
  {
    "url": "hooks/yourHooks.html",
    "revision": "7032d855f05ee4d3cd1b853eeea61e60"
  },
  {
    "url": "index.html",
    "revision": "8319032e0c864767b3464ed38d200144"
  },
  {
    "url": "passages/2019-07-09-js-context/index.html",
    "revision": "c756b78b171219d2ab1fb8e62be6c4a2"
  },
  {
    "url": "passages/2019-07-09-js-this/index.html",
    "revision": "59428859afd477017858384d09e5f6cb"
  },
  {
    "url": "passages/2019-07-10-tool-git/index.html",
    "revision": "7c143676e0c20a76dad5e185c5e45fc1"
  },
  {
    "url": "passages/2019-07-10-tool-markdown/index.html",
    "revision": "e03a1c9b1e31daa0b442ce7e0584b76a"
  },
  {
    "url": "passages/2019-07-11-solution-webpack-env/index.html",
    "revision": "5e74bee5b93e29376a8d6f3a86657d66"
  },
  {
    "url": "passages/2019-07-29-ssr/index.html",
    "revision": "327d43d76816dd39b6a54f7aaff8c98f"
  },
  {
    "url": "passages/2019-08-04-travis-ci/index.html",
    "revision": "4ea20018952b47922705cef4f9a8e300"
  },
  {
    "url": "passages/2019-08-11-wen/index.html",
    "revision": "f63477cc0766016442f0a49bd066889c"
  },
  {
    "url": "passages/2019-08-11-yun/index.html",
    "revision": "14fc2577b84681debcc1f85c1cc260f5"
  },
  {
    "url": "passages/2019-11-05-tool-nvm-mrm/index.html",
    "revision": "4562d49d123a2a1d8d79e4bf32b63cce"
  },
  {
    "url": "webpack/es6转换.html",
    "revision": "b3f2137bc727aead284d9da4a7a8be78"
  },
  {
    "url": "webpack/image与font处理.html",
    "revision": "7803cf4fb509dea6b78d08301c1191f1"
  },
  {
    "url": "webpack/introduction.html",
    "revision": "360f8e976930fca5266813b18aea9a9b"
  },
  {
    "url": "webpack/打包js.html",
    "revision": "e3d6491edf0f31011fcb575467575188"
  },
  {
    "url": "webpack/文件输出管理.html",
    "revision": "86910d34239f04b4c43a59994b1208f9"
  },
  {
    "url": "webpack/样式处理.html",
    "revision": "6854c598c6613848fa9a169b5d2c5365"
  },
  {
    "url": "yun1.jpeg",
    "revision": "c2421fc18347fdf3bdb0cb5044287c09"
  },
  {
    "url": "yun2.jpeg",
    "revision": "212fc7ca8b104c4289619196b9747b58"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
