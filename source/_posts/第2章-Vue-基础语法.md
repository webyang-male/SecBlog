---
title: 第2章 Vue 基础语法
date: 2022-02-22 22:11:50
tags: vue
categories:
  - - WEB前端
    - 框架
description: 本章中，将会讲解生命周期函数，指令，模版，数据，侦听器，事件，循环渲染等基础语法知识点，理解第一章重写过的代码，同时理解数据驱动的编程思想。
---

<style>
  img{
    transform: scale(.5);
  }
</style>

</style>

### 应用和组件的基础概念

````html
<body>
  <div id="root"></div>
</body>
<script>
  // createApp 表示创建一个 Vue 应用, 存储到 app 变量中
  // 传入的参数表示，这个应用最外层的组件，应该如何展示
  // MVVM 设计模式，M -> Model 数据， V -> View 视图， VM -> ViewModel 视图数据连接层
  const app = Vue.createApp({
    data() {
      return {
        message: 'hello world'
      }
    },
    template: "<div>{{message}}</div>"
  });
  // vm 代表的就是 Vue 应用的根组件
  const vm = app.mount('#root');
</script>
````

### 生命周期函数

<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/8/16b371d739d6f702~tplv-t2oaga2asx-watermark.awebp">

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a9468f2b6a8408fbfecee8ea9466d40~tplv-k3u1fbpfcp-watermark.awebp" />

