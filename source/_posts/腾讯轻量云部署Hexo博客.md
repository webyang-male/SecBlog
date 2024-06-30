---
title: 腾讯轻量云部署Hexo博客
date: 2024-01-12 17:22:30
category: Developer
tags: [服务器,blog,hexo]
---
### 💻准备

- 本地建好的博客(默认Node环境配置完成)
- GIT
- 基础环境搭建完成(宝塔面板)的腾讯云(轻量)服务器
- 域名(非必须)

### 🌐参考链接

```
[宝塔Linux面板安装教程](https://www.bt.cn/bbs/thread-19376-1-1.html)
```

### ⚙️步骤

#### 本地生成ssh秘钥

```sh
git config --global user.name "GitHub用户名"
git config --global user.email "GitHub的邮箱"
ssh-keygen -t rsa -C "GitHub的邮箱"
```



如有可跳过，获取`公匙`命令如下

```sh
cat ~/.ssh/id_rsa.pub
```



#### 连接服务器终端

宝塔面板用户可直接左侧导航栏`终端`登录（如图）

##### 切换到 `root` 账号

```shell
sudo su root
```



⚠️宝塔默认是root账号

##### 安装 `git`

```shell
yum install git
```



这里宝塔可能已经默认安装git，腾讯轻量服务器 —– 宝塔定制版已经内置

确认`git`环境与版本

```sh
git -v
```



##### 创建 Git 账户

创建 Git 账户并赋予权限

```sh
adduser git
chmod 740 /etc/sudoers
```



编辑 `/etc/sudoers` 文件

```sh
vim /etc/sudoers
```



按`i`键进入编辑模式，找到`root ALL=(ALL) ALL`，在其下方加入：

```shell
git     ALL=(ALL)     ALL
```



✏️输入完成后按`esc`，再输入`:wq`，保存退出。

修改`/etc/sudoers`权限

```sh
chmod 400 /etc/sudoers
```

设置 git 账户密码

```sh
sudo passwd git
```

输入密码，输入的时候是看不到任何显示的，输完回车即可。

切换至 `git 用户`，创建 `~/.ssh` 文件夹和 `~/.ssh/authorized_keys` 文件

```sh
su git
mkdir ~/.ssh
vim ~/.ssh/authorized_keys
```

同样`i`进入编辑模式，把之前本地准备的`id_rsa.pub`文件中的公钥复制进去，按`esc`后，输入`:wq`保存。

修改权限：

```sh
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
```

本地测试：

```sh
ssh -v git@服务器ip地址或域名
```

如果不用输入密码就代表成功了，可能需要按照提示手动输入一个`yes`。

##### 创建git仓库

切换为`root`用户

```sh
sudo su root
```



创建`repo`作为仓库目录，并加权限

```sh
mkdir /var/repo
chown -R git:git /var/repo
chmod -R 755 /var/repo
```

创建 hexo 目录作为网站根目录

```sh
mkdir /var/hexo
chown -R git:git /var/hexo
chmod -R 755 /var/hexo
```

创建一个空白的 git 仓库

```sh
cd /var/repo
git init --bare hexo.git
```

编辑一个 Git 钩子

```sh
vim /var/repo/hexo.git/hooks/post-receive
```

按`i`进入编辑模式，添加下面的代码，按`esc`输入`:wq` 保存

```sh
#!/bin/bash
git --work-tree=/var/hexo --git-dir=/var/repo/hexo.git checkout -f
```



```sh
chown -R git:git /var/repo/hexo.git/hooks/post-receive
chmod +x /var/repo/hexo.git/hooks/post-receive
```

完成上述操作后，打开宝塔面板左侧文件，正常情况你将看到这俩你创建的文件。

#### 宝塔网站配置

创建一个网站，需把博客目录下宝塔初始化的`index.html`删掉。

### 本地 Git deploy 设置

安装git部署插件

```sh
npm install hexo-deployer-git --save
```

在博客根目录配置：

```sh
deploy:
  type: git
  repo: git@服务器ip或域名:/var/repo/hexo.git
  branch: master
```

配置完成后，可直接hexo三连到自己的服务器。或者编写一个`bat`文件在博客根目录下。

```
deploy.bat
hexo clean && hexo g -d
```

直接双击或者编译器的`run code`即可，免去每次输入3连，剩下请耐心等待。

### 🚀结束语

🐛 如果对文章有任何意见，欢迎交流指出！

### 💖温馨建议

如果 npm 过慢，可以尝试切换npm淘宝源。
