---
title: 第1章 Vue 语法初探
date: 2022-02-07 23:02:51
tags: vue
categories:
  - - WEB前端
    - 框架
description: 通过编写实际例子，Vue的语法有个粗浅的认知
---



<img src="https://cdn.jsdelivr.net/gh/webyang-male/yangimgs/vueLogo.png" alt="" width="60px" align="left">

> 官网标题：渐进式 JavaScript 框架。
>
> 渐进式代表的含义是：主张最少，没有多做职责之外的事。
>
> 每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，它的强势程度会影响在业务开发中的使用方式。
>
> —— 知乎问答

### 官网

https://v3.cn.vuejs.org/guide/

### 安装

#### CDN

```js
<script src="https://unpkg.com/vue@next"></script>
```

###  应用

#### 编写 HelloWorld 和 Counter

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="https://cn.vuejs.org/images/logo.svg">
    <title>imooc-v3</title>
    <!-- 引用vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
  </head>
  <body>
    <div id="root">

    </div>
    <script>
      // 创建一个Vue实例
       Vue.createApp({
         template: '<div>hello world</div>',
       }).mount('#root')
    </script>
  </body>
</html>
````

````html
  <body>
    <div id="root"></div>
    <script>
      // 创建一个Vue实例
      Vue.createApp({
        //数据
        data() {
          return {
            counter: 1,
          };
        },
        template: "<div>{{counter}}</div>",
      }).mount("#root");
    </script>
  </body>
````

#### mounted函数

文档:https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#mounted

页面加载完成，执行此函数

```html
  <body>
    <div id="root"></div>
    <script>
      // 创建一个Vue实例
      Vue.createApp({
        //数据
        data() {
          return {
            counter: 1,
          };
        },
        template: "<div>{{counter}}</div>",
        mounted() {
          console.log("加载完成我执行");
          setInterval(() => {
             this.$data.counter++;
            // this.counter++;//每秒自增
          }, 1000);
        },
      }).mount("#root");
    </script>
  </body>
```

#### 编写案例

v-xx指令教程:https://v3.cn.vuejs.org/api/directives.html#v-html

##### 字符串反转

````html
 <body>
    <div id="root"></div>
    <script>
      // 创建一个Vue实例
      Vue.createApp({
        //数据
        data() {
          return {
            text: "hello coder",
          };
        },
        methods: {
          handerBtnclick() {
            this.text = this.text.split("").reverse().join("");
          },
        },
        template: `<div>
        {{text}}
        <button v-on:click="handerBtnclick">反转</button>
        </div>`,
      }).mount("#root");
    </script>
  </body>
````

##### 内容隐藏

````html
  <body>
    <div id="root"></div>
    <script>
      // 创建一个Vue实例
      Vue.createApp({
        //数据
        data() {
          return {
            show: true,
          };
        },
        methods: {
          handerBtnclick() {
              this.show = !this.show;
          },
        },
        template: `<div>
           <p v-if="show"> hello coder</p>
        <button v-on:click="handerBtnclick">显示/隐藏</button>
        </div>`,
      }).mount("#root");
    </script>
  </body>
````

##### TodoList

````html
 <body>
    <div id="root"></div>
    <script>
      // 创建一个Vue实例
      Vue.createApp({
        //数据
        data() {
          return {
            inputValue: "",
            list: [],
          };
        },
        methods: {
          handerAddItem() {
            this.list.push(this.inputValue);
            this.inputValue = "";
          },
        },
        mounted() {
          let input = document.querySelector("#root > div > input");
          input.value = "";
        },
        //这里的item是v-for中的变量
        template: `
        <div>
        <input v-model="inputValue" />
        <button v-on:click="handerAddItem">增加</button>
        <ul>
            <li v-for="(item,index) in list">{{item}}</li> 
        </ul>
        </div>
        `,
      }).mount("#root");
    </script>
    <script>
      //   let input = document.querySelector("#root > div > input");
      //   input.value = '';
    </script>
  </body>
````

####  组件概念初探

````html
<body>
  <div id="root"></div>
</body>
<script>
  // mvvm , vue 实例，vue 组件
  const app = Vue.createApp({
    data() {
      return {
        inputValue: '',
        list: []
      }
    },
    methods: {
      handleAddItem() {
        this.list.push(this.inputValue);
        this.inputValue = '';
      }
    },
    template: `
      <div>
        <input v-model="inputValue" />
        <button
          v-on:click="handleAddItem"
          v-bind:title="inputValue"
        >
          增加
        </button>
        <ul>
          <todo-item
            v-for="(item, index) of list"
            v-bind:content="item"
            v-bind:index="index"
          />
        </ul>
      </div>
    `
  });

  app.component('todo-item', {
    props: ['content', 'index'],
    template: '<li>{{index}} -- {{content}}</li>'
  });

  app.mount('#root');

</script>
````

