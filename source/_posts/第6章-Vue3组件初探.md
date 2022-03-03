---
title: 第6章 Vue3组件初探
date: 2022-03-02 22:01:59
tags: vue
categories:
  - - WEB前端
    - 框架
description: 
---

###  组件的基础

教程：https://v3.cn.vuejs.org/guide/component-basics.html

#### 组件定义

> 在vue中，组件是<font style="color:gold;">可复用的Vue实例</font>，它拥有独一无二的组件名称，它可以扩展HTML元素，以组件名称的方式作为自定义的HTML标签。组件可大大提高了代码的复用率。

组件是Vue中的一个重要概念，是一个可以重复使用的Vue实例，它拥有独一无二的组件名称，它可以扩展HTML元素，以组件名称的方式作为自定义的HTML标签。因为组件是可复用的Vue实例，所以它们与`new Vue（）`接收相同的选项，例如`data，computed、watch、methods`以及生命周期钩子等。仅有的例外是像el这样根实例特有的选项。

把一些公共的模块抽取出来，然后写成单独的的工具组件或者页面，在需要的页面中就直接引入即可。那么我们可以将其抽出为一个组件进行复用。

例如 ：页面头部、侧边、内容区，尾部，上传图片，等多个页面要用到一样的就可以做成组件，提高了代码的复用率。

#### 组件复用

````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="https://cn.vuejs.org/images/logo.svg" />
    <title>imooc-v3</title>
    <!-- 引用vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
    <style>
        .demo{
            width: 100px;
            height: 100px;
            background: deepskyblue;
            color: #fff;
            margin: 10px auto;
            display: flex;
            justify-content: center;
        }
    </style>
</head>

<body>
    <div id="root">
    </div>
    <script>
        // 组件具备复用性

        const app = Vue.createApp({
            template: `
            <div>
                <counter />
                <counter />
                <counter />
            </div>
          `
        });


        app.component('counter', {
          data() {
            return {
              count: 1
            }
          },
          template: `<div class="demo" @click="count += 1">{{count}}</div>`
        })


        const vm = app.mount('#root');
    </script>

</html>
````

#### 局部组件

教程:https://v3.cn.vuejs.org/guide/component-registration.html#%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C

````js
    const Counter = {
      data() {
        return {
          count: 1
        }
      },
      template: `<div @click="count += 1">{{count}}</div>`
    }

    const app = Vue.createApp({
      components: {
        'counter': Counter
      },
      template: `
            <div>
              <counter />
            </div>
          `
    });
    const vm = app.mount('#root');
````

##### 小结

````js
    <div id="root">
    </div>
    <script>
        // 组件具备复用性
        // 全局组件，只要定义了，处处可以使用，性能不高，但是使用起来简单，名字建议 小写字母单词，中间用横线间隔
        // 局部组件，定义了，要注册之后才能使用，性能比较高，使用起来有些麻烦，建议大些字母开头，驼峰命名
        // 局部组件使用时，要做一个名字和组件间的映射对象，你不写映射，Vue 底层也会自动尝试帮你做映射

        const Counter = {
            data() {
                return {
                    count: 1
                }
            },
            template: `<div @click="count += 1">{{count}}</div>`
        }

        const HelloWorld = {
            template: `<div>hello world</div>`
        }

        const app = Vue.createApp({
            components: {
                // counter: Counter,
                // 'hello-world': HelloWorld,
                Counter,
                HelloWorld,
            },
            template: `
            <div>
              <hello-world />
              <counter />
            </div>
          `
        });

        // app.component('counter-parent', {
        //   template: `<counter />`
        // })

        // app.component('counter', {
        //   data() {
        //     return {
        //       count: 1
        //     }
        //   },
        //   template: `<div @click="count += 1">{{count}}</div>`
        // })


        const vm = app.mount('#root');
    </script>
````

#### 组件间传值及校验

[通过-prop-向子组件传递数据](https://v3.cn.vuejs.org/guide/component-basics.html#%E9%80%9A%E8%BF%87-prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)

##### 动态属性

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          num: 520
        }
      },
      //v-bind动态属性
      template: `
            <div>
              <test :content="num" />
            </div>
          `
    });

    app.component('test', {
      props: ['content'],//父组件传递的值
      template: `<div>{{typeof content}}</div>`,
    })
    const vm = app.mount('#root');
  </script>
````

##### 传值校验

````js
  <script>
    const app = Vue.createApp({
      data() {
        return { num: 1234 }
      },
      template: `
        <div><test :content="num" /></div>
      `
    });
  
    // type:String, Boolean, Array, Object, Function, Symbol
    // required 必填
    // default 默认值
    app.component('test', {
      props: {
        content: {
          type: Number,
          // required: true,
          //validator方法接收父组件传递的值，并进行深度验证
          validator: function(value) {
            return value < 1000;
          },
          // default: 666.////如果父组件没有写content属性值,则默认传递default值
          //default也可以是函数
          default: function() {
            return 456;
          }
        }
      },
      template: `<div>{{content}}</div>`
    });
  
    const vm = app.mount('#root');
  </script>
````

