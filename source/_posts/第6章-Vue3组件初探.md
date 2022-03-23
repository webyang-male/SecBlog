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

##### Prop 的大小写命名

教程:https://v3.cn.vuejs.org/guide/component-props.html#prop-%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%91%BD%E5%90%8D-camelcase-vs-kebab-case

##### 单向数据流

````js
<body>
  <div id="root"></div>
</body>
<script>
  // v-bind="params"
  // :content="params.content" :a="params.a" :b="params.b" :c="params.c"
  // 属性传的时候，如果使用 content-abc 这种命名，接的时候，使用 contentAbc 命名
  // 单项数据流的概念: 子组件可以使用父组件传递过来的数据，但是绝对不能修改传递过来的数据
  const app = Vue.createApp({
    data() {
      return { num: 1 }
    },
    template: `
      <div>
        <counter :count="num" />
        <counter :count="num" />
        <counter :count="num" />
      </div>
    `
  });

  app.component('counter', {
    props: ['count'],
    template: `<div @click="count += 1">{{count}}</div>`
  });

  const vm = app.mount('#root');
</script>
````

##### Non-Props 属性

教程:https://v3.cn.vuejs.org/guide/component-attrs.html

###### 禁用 Attribute 继承

<div class="custom-block tip">
  <p class="custom-block-title">TIP</p> 
  <p>如果你不希望组件的根元素继承 attribute，可以在组件的选项中设置 inheritAttrs: false。</p>
  <p>禁用 attribute 继承的常见场景是需要将 attribute 应用于根节点之外的其他元素。</p>
</div>

###### 多个根节点上的 Attribute 继承

与单个根节点组件不同，具有多个根节点的组件不具有自动 attribute [fallthrough (隐式贯穿)](https://en.wiktionary.org/wiki/fall-through#English) 行为。如果未显式绑定 `$attrs`，将发出运行时警告。

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```

```js
// 这将发出警告
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})

// 没有警告，$attrs 被传递到 <main> 元素
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```

###### 小结代码

````js
  <script>
    // Non-prop 属性
    const app = Vue.createApp({
      template: `
        <div>
          <counter msg="hello" msg1="hello1" />
        </div>
      `,
    });

    app.component("counter", {
      // inheritAttrs: false,//是否继承父组件的属性
      mounted() {
        console.log(this.$attrs.msg);
      },
      //   v-bind="$attrs"绑定所有属性
      template: `
        <div :msg="$attrs.msg">Counter</div>
        <div v-bind="$attrs">Counter</div>
        <div :msg1="$attrs.msg1">Counter</div>
      `,
    });

    const vm = app.mount("#root");
  </script>
````

#### 父子组件通信

`$emit`

应用教程1:https://v3.cn.vuejs.org/guide/component-basics.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6

API教程2:https://v3.cn.vuejs.org/api/instance-methods.html#emit

##### 自定义事件

教程：https://v3.cn.vuejs.org/guide/component-custom-events.html

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          count: 1,
        };
      },
      methods: {
        //执行函数
        handleAddOne() {
          this.count += 1;
        },
      },
      //父组件接收子组件的事件,分隔符命名
      template: `
        <div>
          <counter :count="count" @add-one="handleAddOne"/>
        </div>
      `,
    });

    app.component("counter", {
      props: ["count"],
      methods: {
          //点击触发自身事件
        handleClick() {
          //子组件的事件传递给父组件,驼峰命名
          this.$emit("addOne");
        },
      },
      //子组件模板绑定点击事件
      template: `
        <div @click="handleClick">{{count}}</div>
      `,
    });

    const vm = app.mount("#root");
  </script>
````

###### 使用事件抛出一个值

````html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="https://cn.vuejs.org/images/logo.svg" />
    <title>imooc-v3</title>
    <!-- 引用vue.js -->
    <script src="https://unpkg.com/vue@next"></script>
    <style>
      .demo {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: deepskyblue;
        color: #fff;
        margin: 10px auto;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>
  </body>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          count: 1,
        };
      },
      methods: {
        //执行函数
        handleAdd(param) {
          this.count += param;
        },
      },
      //父组件接收子组件的事件,分隔符命名
      template: `
        <div>
          <counter :count="count" @add="handleAdd" class="demo"/>
        </div>
      `,
    });

    app.component("counter", {
      props: ["count"],
      methods: {
        //点击触发自身事件
        handleClick() {
          //子组件的事件传递给父组件,驼峰命名
          this.$emit("add", 2);
        },
      },
      //子组件模板绑定点击事件
      template: `
        <div @click="handleClick">{{count}}</div>
      `,
    });

    const vm = app.mount("#root");
  </script>
</html>

````

##### v-model-参数

教程:https://v3.cn.vuejs.org/guide/component-custom-events.html#v-model-%E5%8F%82%E6%95%B0

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          count: 1,
        };
      },
      template: `
          <counter v-model="count" class="demo"/>
      `,
    });

    app.component("counter", {
      //modelValue是默认固定写法
      props: ["modelValue"],
      methods: {
        //点击触发自身事件
        handleClick() {
          //子组件的事件传递给父组件,驼峰命名
          this.$emit("update:modelValue", this.modelValue + 6);
        },
      },
      //子组件模板绑定点击事件
      template: `
        <div @click="handleClick">{{modelValue}}</div>
      `,
    });

    const vm = app.mount("#root");
  </script>
````

或者自定义参数名：

````js
    const app = Vue.createApp({
      data() {
        return {
          count: 1,
        };
      },
      template: `
          <counter v-model:myApp="count" class="demo"/>
      `,
    });

    app.component("counter", {
      props: ["myApp"],
      methods: {
        //点击触发自身事件
        handleClick() {
          //子组件的事件传递给父组件,驼峰命名
          this.$emit("update:myApp", this.myApp + 6);
        },
      },
      //子组件模板绑定点击事件
      template: `
        <div @click="handleClick">{{myApp}}</div>
      `,
    });

    const vm = app.mount("#root");
````

#### 组件间双向绑定高级内容

#####  多个 `v-model` 绑定

教程:https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%9A%E4%B8%AA-v-model-%E7%BB%91%E5%AE%9A

##### 处理 v-model 修饰符

教程: https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%84%E7%90%86-v-model-%E4%BF%AE%E9%A5%B0%E7%AC%A6

````js
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return {
        count: 'a',
      }
    },
    template: `
      <counter v-model.uppercase="count" />
    `
  });

  app.component('counter', {
    props: {
      'modelValue': String,
      //固定写法
      'modelModifiers': {
        default: ()=> ({})
      }
    },
    methods: {
      handleClick() {
        let newValue = this.modelValue + 'b';
        if(this.modelModifiers.uppercase) {
          newValue = newValue.toUpperCase();
        }
        this.$emit('update:modelValue', newValue);
      },
    },
    template: `
      <div @click="handleClick">{{modelValue}}</div>
    `
  });

  const vm = app.mount('#root');
</script>
````

#### 插槽

教程:https://v3.cn.vuejs.org/guide/component-slots.html#%E6%8F%92%E6%A7%BD
