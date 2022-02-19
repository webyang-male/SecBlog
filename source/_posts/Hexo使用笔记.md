---
title: Hexo使用笔记
date: 2022-02-19 18:43:25
tags: Hexo
categories: 主题
description: Hexo使用学习笔记
---

## 插件

### 文章置顶

[hexo-generator-index](https://github.com/hexojs/hexo-generator-index)从 2.0.0 开始，已经支持文章置顶功能。可以直接在文章的`front-matter`区域里添加`sticky: 1`属性来把这篇文章置顶。

数值越大，置顶的优先级越大。

### 文章加密

`npm install --save hexo-blog-encrypt`

文章`front-matter`里面添加

```text
---
title: 文章标题
date: 位置时间
password: (填写你想设置的密码)
---
```

### markdown文字颜色

```html
<font style="color:lightskyblue;">
<font style="color:skyblue;">
<font style="color:deepskyblue;">
<font style="color:rgb(0 120 231);">
<font style="color:rgb(34 153 221);">
<font style="color:#1b91ff;">
<font style="color:skyblue;font-size:18px;">

<font style="color:pink;">
<font style="color:tomato;">
<font style="color:#FF4500;">

<font style="color:orange;">
<font style="color:darkorange;">

<font style="color:gold;">
```

## Hexo

### 摘要

````md
<!-- more-->
````

