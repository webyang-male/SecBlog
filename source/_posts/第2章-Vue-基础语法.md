---
title: 第2章 Vue 基础语法浅知
date: 2022-02-22 22:11:50
tags: vue
categories:
  - - WEB前端
    - 框架
description: 本章中，将会讲解生命周期函数，指令，模版，数据，侦听器，事件，循环渲染等基础语法知识点，理解第一章重写过的代码，同时理解数据驱动的编程思想。
---

<style>
  h3~img{
    transform: scale(.5)!important;
  }
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

```html
 <body>
    <div id="root">
<!-- 这里直接写也会执行下图及后面函数 -->
      <p>{{ message }}</p>
    </div>
    <script>
      // 生命周期函数:在某一时刻会自动执行的函数
      Vue.createApp({
        //数据
        data() {
          return {
           message:'hello vue'
          };
        },
        //在实例生成之前会自动执行的函数
        beforeCreate() {
            console.log('beforeCreate');
        },
       //在实例生成之后会自动执行的函数
        created() {
            console.log('created');
        },
        //在组件渲染到页面之前会自动执行的函数
        beforeMount() {
            console.log('beforeMount');
        },
        //在组件渲染到页面之后会自动执行的函数
        mounted() {
            console.log('mounted');
        },
        //在数据发生变化时会自动执行的函数
        beforeUpdate() {
            // console.log('beforeUpdate');
            console.log(document.getElementById('root').innerHTML,'beforeUpdate');
        },
        //在数据发生变化,页面重新渲染后会自动执行的函数
        updated() {
            console.log(document.getElementById('root').innerHTML,'updated');
        },
        //在vue应用失效时自动执行的函数
        beforeDestroy() {
            console.log(document.getElementById('root').innerHTML,'beforeDestroy');
        },
        //在vue应用失效且dom完全销毁时自动执行的函数
        destroyed() {
            console.log(document.getElementById('root').innerHTML,'destroyed');
        },
        template: `<p>{{ message }}</p> `,
      }).mount("#root");
    </script>
  </body>
```



![](https://cdn.jsdelivr.net/gh/webyang-male/yangimgs/vue-tem.png)

### 常用模版语法

教程：https://v3.cn.vuejs.org/guide/template-syntax.html

##### 一、指令简介

<div class="custom-block tip">
  <p class="custom-block-title">TIP</p> 
  <p>指令是带有v-前缀的特殊特性。指令特性的值预期是单个JavaScript表达式。</p>
  <p>指令的职责是：当表达式的值改变时，将其产生的连带影响，响应式的作用于DOM。</p>
</div>

##### 二、指令学习

###### 1、v-if指令

if指令可以完全根据表达式的值在DOM中生成或移除一个元素。如果v-if表达式赋值为false，那么对应的元素就会从DOM中移除；否则，对应元素的一个克隆将被重新插入DOM中。记住，这个是直接决定是否在网页进行渲染，而不是元素是否显示。

###### 2、v-else指令

v-else就是JavaScript中else的意思，它必须跟着v-if，充当else功能。

###### 3、v-else-if指令

v-else-if，顾名思义，充当v-if的“else-if块”，可以连续使用。类似于v-else，v-else-if也必须紧跟在带v-if或者v-else-if的元素之后。
**注意：这些条件判断只会有一个生效**

###### 4、v-show指令

v-show指令是根据表达式的值来显示或者隐藏HTML元素。当v-show赋值为false时，元素将被隐藏。查看DOM时，会发现元素上多了一个内联样式style=”display:none”。

###### 5、v-if和v-show指令详解

在切换v-if模块时，vue.js有一个局部编译/卸载过程，因为v-if中的模板可能包括数据绑定或子组件。v-if是真实的条件渲染，因为它会确保条件块在切换时合适的销毁与重建条件块内的事件监听器和子组件。

v-if是惰性的一一如果初始渲染时条件为假，则什么也不做，在条件第一次变为真时才开始局部编译（编译会被缓存起来）。

相比之下，v-show简单的多一一元素始终被编译并保留，只是简单地基于切换。

一般来说，v-if有更高的切换消耗，而v-show有更高的初始渲染消耗。因此，<font style="color:darkorange;">如果需要频繁的切换，则使用v-show较好；如果在运行时条件改变较少，则使用v-if较好。</font>

###### 6、v-model指令

v-model指令用来在input、select、text、checkbox、radio等表单控件元素上创建双向数据绑定。根据控件类型v-model自动选取正确的方法更新元素。尽管有点神奇，但是v-model不过是语法糖，在用户输入事件中更新数据。

###### 7、v-model指令详解

v-model会忽略所有表单元素的value、checked、selected特性的初始值而总是将Vue实例的数据作为数据来源。你应该通过JavaScript在组件的data选项中声明初始值。

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

1. text 和 textarea元素使用 value 属性和 input 事件
2. checkbox 和 radio 使用 checked 属性和 change 事件
3. select 字段将 value 作为 prop 并将change 作为事件

v-model指令修饰符：

1. number：如果想自动将用户的输入值转为数值类型，可以给 v-model添加number修饰符
2. trim：如果要自动过滤用户输入的首尾空白字符，可以给 v-model添加trim修饰符

###### 8、v-bind指令

v-bind指令用于响应更新HTML特性，将一个或多个attribute，或者一个组件prop动态绑定到表达式。

###### 9、v-for指令

我们可以用 v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 (item,key,index) in items 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名,key是当前项的键名,index是当前项的索引。

###### 10、v-for指令之数组更新检测

Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些方法会改变vue实例里面的数组本身。这些被包裹过的方法包括：

1. push()
2. pop()
3. shift()
4. unshift()
5. splice()
6. sort()
7. reverse()

###### 11、v-for指令之注意点

**不要在同一元素上使用 v-if 和 v-for**
当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 

###### 12、v-on指令

可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

###### 13、v-on指令之事件绑定

v-on 还可以接收一个需要调用的方法名称

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：直接调用并且传参

###### 14、v-on指令之事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由**点开头的指令后缀**来表示的。

```vue
.stop
.prevent
.capture
.self
.once
.passive  //这个属性就是BOM里面对事件监听的选项设置表示 listener 永远不会调用preventDefault()
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self `会阻止所有的点击，而` v-on:click.self.prevent `只会阻止对元素自身的点击。

###### 14、v-on指令之按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
你可以直接将 KeyboardEvent.key [https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values]暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

###### 15、v-on指令之按键修饰符

V-on指令可以给单个元素绑定多个事件,每个事件另起一个v-on指令即可

###### 16、v-once指令

通过前面的学习我们知道怎么将一个Vue实例中的data对象里的数据渲染到DOM元素中，但是如果我们只想在网页加载时，只渲染一次数据，后期即使是data种的数据变化了，我们也不要再次进行渲染，那么我们可以使用v-once指令。

###### 17、v-html指令

双大括号把数据解释为普通文本，而非HTML代码。所以在需要输出真正的HTML时，我们就可以使用v-html
