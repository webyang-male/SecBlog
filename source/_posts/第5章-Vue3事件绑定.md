---
title: 第5章 Vue3事件绑定
date: 2022-02-27 19:02:16
tags: vue
categories:
  - - WEB前端
    - 框架
description: 
---

####  事件绑定用法

教程：https://v3.cn.vuejs.org/guide/events.html#%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6

##### 单个参数

```js
  <body>
    <div id="root"></div>
  </body>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          counter: 0,
        };
      },
      methods: {
        //   参数接收
        handleClick(num) {
          this.counter += num;
        },
      },
      template: `
        <div>
        {{counter}}&nbsp;
          <button @click="handleClick(2)">增加</button>
        </div>
      `,
    });
    const vm = app.mount("#root");
  </script>
```

##### 多个参数

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          counter: 0,
        };
      },
      methods: {
        //   参数接收
        handleClick(num, event) {
            //获取事件对象
          console.log(event);
          this.counter += num;
        },
      },
      template: `
        <div>
        {{counter}}&nbsp;
          <button @click="handleClick(2,$event)">增加</button>
        </div>
      `,
    });

    const vm = app.mount("#root");
  </script>
````

##### 多个事件/方法

```js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          counter: 0,
        };
      },
      methods: {
        //   参数接收
        handleClick(num, event) {
            //获取事件对象
          console.log(event);
          this.counter += num;
          alert('事件1触发!');
        },
        handleClick1() {
         alert('事件2触发!');
        },
      },
      template: `
        <div>
        {{counter}}&nbsp;
          <button @click="handleClick(2,$event),handleClick1()">增加</button>
        </div>
      `,
    });

    const vm = app.mount("#root");
  </script>
```

#### 事件修饰符

教程:https://v3.cn.vuejs.org/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6

##### `.stop`

````js
    const app = Vue.createApp({
      data() {
        return {
          counter: 0,
        };
      },
      methods: {
        //   参数接收
        handleClick(num, event) {
          //获取事件对象
          console.log(event);
          this.counter += num;
          alert("事件1触发!");
        },
        handleClick1() {
          alert("事件2触发!");
        },
      },
      //@click.stop 阻止点击事件冒泡,触发事件的默认行为,handleClick不会执行
      template: `
      <div @click="handleClick(1)">
        <div>
        {{counter}}&nbsp;
          <button @click.stop="handleClick1">增加</button>
        </div>
      </div>
      `,
    });

    const vm = app.mount("#root");
````

>  事件修饰符：stop, prevent, capture, self, once, passive
> 		按键修饰符：enter, tab, delete, esc, up, down, left, right
> 		鼠标修饰符：left, right, middle
> 		精确修饰符：exact

````js
  // event, $event
  const app = Vue.createApp({
    methods: {
      handleClick() {
        console.log('click')
      },
    },
    template: `
      <div>
        <div @click.ctrl.exact="handleClick">123</div>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
````

##### .lazy

````js
  <body>
    <div id="root"></div>
  </body>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: '',
        };
      },
      //vue3支持自定义checkbox的value内容
      template: `
      <div>
        <p>数据延迟同步:&nbsp;{{ message }}</p>
        请输入:&nbsp;<input  v-model.lazy="message"/>
      </div>
      `,
    });
    const vm = app.mount("#root");
  </script>
````

##### .number

````js
    const app = Vue.createApp({
      data() {
        return {
          message: '123',
        };
      },
      //vue3支持自定义checkbox的value内容
      template: `
      <div>
        <p>数据类型:&nbsp;{{ typeof message }}</p>
        请输入:&nbsp;<input  v-model.number="message" type="number"/>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

##### .trim

```js
  <script>
    // trim 去除空格
    const app = Vue.createApp({
      data() {
        return {
          message: "hello",
        };
      },
      template: `
      <div>
        {{message}}
        <input v-model.trim="message"  />
      </div>
    `,
    });

    const vm = app.mount("#root");
  </script>
```



#### 表单双向绑定指令

##### `textarea`

vue中直接单标签,vue会自己处理`textarea`标签数据

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: "lixia",
        };
      },
      template: `
        <div>
          <p>{{message}}</p>
          <textarea v-model="message"  />
        </div>
      `,
    });
    const vm = app.mount("#root");
  </script>
````

##### 多选按钮

````js
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: [],
        };
      },
      //value值必须写
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
          香菜&nbsp;<input type="checkbox" v-model="message"  value="香菜"/>
          草莓&nbsp;<input type="checkbox" v-model="message"  value="草莓"/>
          土豆&nbsp;<input type="checkbox" v-model="message"  value="土豆"/>
      </div>
      `,
    });
    const vm = app.mount("#root");
  </script>
````

##### 单选按钮

````js
    const app = Vue.createApp({
      data() {
        return {
            //radio只会单选,存放列表其中一个的值,没必要数组
          message: '',
        };
      },
      //value值必须写
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
          香菜&nbsp;<input type="radio" v-model="message"  value="香菜"/>
          草莓&nbsp;<input type="radio" v-model="message"  value="草莓"/>
          土豆&nbsp;<input type="radio" v-model="message"  value="土豆"/>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

##### select标签

````js
    const app = Vue.createApp({
      data() {
        return {
            //radio只会单选,存放列表其中一个的值,没必要数组
          message: '',
        };
      },
      //value值必须写
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
        <select v-model="message">
            <option>香菜</option>
            <option>草莓</option>
            <option>土豆</option>
        </select>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

##### option标签

````js
    const app = Vue.createApp({
      data() {
        return {
          message: [],
        };
      },
     
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
        <select v-model="message" multiple>
            <option disabled value=''>请选择内容</option>
            <option>香菜</option>
            <option>草莓</option>
            <option>土豆</option>
        </select>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

**改版**

````js
    const app = Vue.createApp({
      data() {
        return {
          message: [],
          options: [
            {
              text: "A",
              value: "A",
            },
            {
              text: "B",
              value: "B",
            },
            {
              text: "C",
              value: "C",
            },
          ],
        };
      },
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
        <select v-model="message" multiple>
            <option disabled value=''>请选择内容</option>
            <option v-for="item in options" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

自定义存储数据传输结构

````js
    const app = Vue.createApp({
      data() {
        return {
          message: [],
          options: [
            {
              text: "A",
              value: {
                value: "A",
              },
            },
            {
              text: "B",
              value: {
                value: "B",
              },
            },
            {
              text: "C",
              value: {
                value: "C",
              },
            },
          ],
        };
      },
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
        <select v-model="message" multiple>
            <option disabled value=''>请选择内容</option>
            <option v-for="item in options" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

##### 其他

````js
    const app = Vue.createApp({
      data() {
        return {
          message: true,
        };
      },
      //vue3支持自定义checkbox的value内容
      template: `
      <div>
        <p>主人选择了:&nbsp;{{ message }}</p>
        请勾选:<input type="checkbox" v-model="message" true-value="真" false-value="假"/>
      </div>
      `,
    });
    const vm = app.mount("#root");
````

