---
title: 第3章 Vue3计算属性和侦听器&&样式绑定
date: 2022-02-26 16:24:13
tags: vue
categories:
  - - WEB前端
    - 框架
description:
---

### 计算属性和侦听器

教程：https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7

````html
<body>
  <div id="root"></div>
</body>
<script>
  // data & methods & computed & watcher
  // computed 和 method 都能实现的一个功能，建议使用 computed，因为有缓存
  // computed 和 watcher 都能实现的功能，建议使用 computed 因为更加简洁
  const app = Vue.createApp({
    data() {
      return {
        message: "hello world",
        count: 2,
        price: 5,
        newTotal: 10,
      }
    },
    watch: {
      // price 发生变化时，函数会执行
      price(current, prev) {
        this.newTotal = current * this.count;
      }
    },
    computed: {
      // 当计算属性依赖的内容发生变更时，才会重新执行计算
      total() {
        return Date.now() + this.count;
        // return this.count * this.price
      }
    },
    methods: {
      formatString(string) {
        return string.toUpperCase();
      },
      // 只要页面重新渲染，才会重新计算
      getTotal() {
        return Date.now();
        // return this.count * this.price;
      },
    },
    template: `
     <div> {{message}} {{newTotal}} </div>
    `
  });
  const vm = app.mount('#root');
</script>
````

### 样式绑定

教程：https://v3.cn.vuejs.org/guide/class-and-style.html

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="https://cn.vuejs.org/images/logo.svg" />
    <title>Vue3样式绑定和子组件</title>
    <style>
      div {
        max-width: 10rem;
        margin: 0 auto;
      }
      .red {
        color: red;
      }
      .green {
        color: green;
      }
    </style>
    <script src="https://unpkg.com/vue@next"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          // data创建样式的方式
          classString: "red",
          classObject: { red: false, green: true },
          classArray: ["red", "green", { brown: false }],
          styleString: "color: #fff;background: deepskyblue;",
          styleObject: {
            color: "orange",
            background: "yellow",
          },
        };
      },
      template: `
      <div :style="styleString">
        Hello Vue
        <demo class="red"/>
      </div>
    `,
    });

    //创建子组件
    app.component("demo", {
      // 子组件多个节点时,使用$attrs绑定样式
      template: `
      <div :class="$attrs.class">one</div>
      <div :class="$attrs.class">two</div>
    `,
    });

    const vm = app.mount("#root");
  </script>
</html>
````

