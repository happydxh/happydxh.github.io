---
title: "git"
date: "2019-07-10"
permalink: "2019-07-10-tool-git"
---

### 一 准备工作
- **安装git**
- **连接**

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
- **SSH加密**  
第一步：在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```
你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

第2步：登陆GitHub，打开“settings”，“SSH Keys”页面： 

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

<img :src="$withBase('/git.png')" alt="git">

### 二 git命令

**1、版本管理相关**

```js
git help  // 查看常用命令
git clone // 克隆远程仓库
git diff <file> // 比较指定文件工作区和暂存区差异（git diff）
git add <file> // 将指定文件的修改提交到暂存区
git commit -m "提交描述" // 将暂存区的文件提交到本地仓库
git log // 查看提交记录
git checkout -- <file> // 从工作区撤销某个文件修改
git checkout . // 从工作区撤销所有文件修改
git reset HEAD <file> // 从暂存区撤销到工作区（git reset HEAD .）
git reset –-hard <commit_id> // 回滚到某次提交
git push -f origin develop // 回滚后强制远程同步
git reflog // 可以查看未来的提交记录
```

**2、分支管理**
```js
git pull // 拉取最新内容
git branch // 查看本地所有分支
git branch -r // 查看远程仓库所有分支
git branch dxh // 创建一个新分支，分支名为dxh
git checkout dxh // 切换分支到dxh
git merge dxh // 合并分支（解决冲突）
git branch -d dxh // 删除某个已经被合并了的分支
git branch -D dxh // 强制删除某个分支，没被合并的也可以删
git checkout -b <local_branch> origin <remote_branch> // 把远程分支拉到本地
git push -u origin dxh // 首次将本地分支推到远程仓库并创建改分支
git push // 推送
```
**3、保存尚未提交的改动**
```js
git stash // 保存你不想提交改动
git stash save "这里是注释" // 同上，加上注释方便之后对应释放
git stash list  // 查看保存列表
git stash apply stash@{0} // 释放对应的保存
git stash pop stash@{0}  // 释放对应的保存，同时在list中删除该条记录
```
**4、打标签**
```js
git tag v1.0 //发布打标签
git tag //查看标签
git show v1.0 //查看标签详细信息
git tag -d v1.0 //删除标签
git push origin v1.0 //推送某个标签到远程
git push origin –tag //一次性推送全部未推送到远程的本地标签
// 删除远程标签 分两步
// A、先删除本地标签 
git tag -d v1.0
// B、再删除远程标签 
git push origin :refs/tags/v1.0
```

### 三、配置别名
```js
git config --global alias.st status
git config --global alias.ci commit
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg “log --graph”
git config --global alias.lg1 “log --graph --pretty=oneline --abbrev-commit”
git config –-global --list //查看全局配置信息
git config –-local --list //查看当前仓库的配置信息
```