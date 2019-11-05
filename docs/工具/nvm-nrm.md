---
title: "nvm和nrm"
date: "2019-11-05"
permalink: "2019-11-05-tool-nvm-mrm"
---

# nvm和nrm

## nvm

最近运行一个项目的时候，由于自己电脑的`node`版本比较高，导致无法启动项目，需要将自己的node版本降低，我首先想到的
就是`nvm`,一直都知道`nvm`可以用来做`node`的版本管理，但由于之前在`node`版本上一直没有出现过问题，也就一直没有去使用这个工具，这次恰好碰到，正好总结下，将安装使用以及一些注意点记录下来

**这里介绍的是Mac环境下安装nvm**

### 安装步骤
首先打开终端，进入当前用户的home目录中

```bash
cd ~
```

然后使用`ls -a`显示这个目录下的所有文件（夹）（包含隐藏文件及文件夹），查看有没有`.bash_profile`这个文件

```bash
ls -a
```
如果没有，则新建一个

如果有或者新建完成后,在终端中执行下面命令进行安装（全部复制执行）
```
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
注意使用`sudo`权限安装

在安装完成后，也许你会在终端输入nvm验证有没有安装成功，这个时候你会发现终端打出`Command not found`，其实这并不是没有安装成功，你只需要重启终端就行，再输入nvm就会出现`Node Version Manager`帮助文档，这表明你安装成功了

然后你就可以使用nvm的一些命令进行`node`的版本安装和切换了

### 一些常见的nvm命令
```js
nvm ls-remote // 列出所有可安装的版本
nvm install <version> // 安装指定的版本，如nvm install v10.8.0
nvm uninstall <version> // 卸载指定的版本
nvm ls // 列出所有已经安装的版本
nvm use <version> // 切换使用指定的版本
nvm current // 显示当前使用的版本
nvm alias default <version> // 设置默认node版本
```

## nrm
nrm是一个切换npm包来源的工具，他可以自由的切换我们下载的包是来自npm、淘宝源、还是是我们自行搭建的npm库私有源

### nrm 的安装
```bash
// 全局安装
npm install nrm -g
```

安装完成后，输入命令 `nrm ls`，可以看到默认已经有了 6 个源（带 * 号的为当前使用的源）

```
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```
#### 切换npm源
输入 nrm use taobao，即切换 registry 到 taobao，这时我们使用`npm i xxx`便是从淘宝源上下载`xxx`包
#### 添加npm源
```
nrm add title http://npm.xxx.cn
```
title是名称，可以自行命名(如 anpm、bnpm、cnpm、dnpm等)，后面是源的url地址(如公司自行搭建的npm私有库地址)

#### nrm 常用命令
```js
nrm ls // 查看所有配置好的源以及对应名称
nrm add title http://npm.xxx.cn // title 是名称，可以自行命名，后面是源的 url 地址
nrm del title // 删除源，根据名称 title 可以删除对应的源
nrm use title // 切换源，即可使用 title 对应名称的源
// 更多命令在命令行输入 nrm 即可查看
```

