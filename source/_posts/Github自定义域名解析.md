---
title: Hexo博客Github自定义域名解析
date: 2024-06-30 13:22:30
category: Developer
tags: [github,blog,hexo]
---

#### 1、代码存储库设置

代码提交后，点击仓库的`setting`，进入存储库相关设置。`General`这里首先设置好存储库的名称和代码分支：

![github常规设置](source/assets/githubpages-setting.png)

`Pages`这里设置博客代码的分支和构建文件夹

![github-Pages设置](source/assets/githubpages-setting1.png)

下面是用于保存或删除 GitHub Pages 上的自定义域的设置框的屏幕截图。 在显示“example.com”的文本框右侧有一个红色类型的标记为“删除”的按钮。

![](https://docs.github.com/assets/cb-54199/images/help/pages/remove-custom-domain.png)

#### 2、DNS解析

在博客代码根目录下新建`CNMAE`文件并推送到github存储库，文件名大写无文件后缀，内容格式如下：

```
<custom>.github.io //<custom>写实际仓库命名，前面教程图示名称就是test.github.io
```

在对应云服务商设置[自定义域的 DNS 记录](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#dns-records-for-your-custom-domain)

| 场景                                            | DNS 记录类型       | DNS 记录名称 | DNS 记录值                                                   |
| ----------------------------------------------- | ------------------ | ------------ | ------------------------------------------------------------ |
| Apex 域 （`example.com`）                       | `A`                | `@`          | `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153` |
| Apex 域 （`example.com`）                       | `AAAA`             | `@`          | `2606:50c0:8000::153` `2606:50c0:8001::153` `2606:50c0:8002::153` `2606:50c0:8003::153` |
| Apex 域 （`example.com`）                       | `ALIAS` 或 `ANAME` | `@`          | `USERNAME.github.io` 或 `ORGANIZATION.github.io`             |
| 子域 （`www.example.com`、 `blog.example.com`） | `CNAME`            | `SUBDOMAIN`  | `USERNAME.github.io` 或 `ORGANIZATION.github.io`             |

图示为腾讯云DNS解析案例：

![tx-dns](source/assets/tx-dns.png)

这里起的二级域名”test“，比如你的顶级域名是”example.com“，那么此图的自定义域名即为”test.example.com“。耐心等待几分钟，DNS解析需要时间。成功即可通过自定义域名访问部署于github的hexo博客。

3、Vercel托管加速

| Type  | Name                         |         Value         |
| ----- | ---------------------------- | :-------------------: |
| CNAME | test（这里写实际的二级域名） | cname.vercel-dns.com. |

