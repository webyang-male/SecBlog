---
title: JS工厂模式
date: 2024-05-30 9:19:21
tags: [JavaScript,设计模式]
category: Developer
---

### 1 工厂模式

#### 1.1 什么是工厂模式

工厂模式的名字很直白，封装的模块就是一个工厂一样批量的产出需要的对象。常见的工厂模式的体征就是调用的时候不需要new，而且传入的参数比较简单。

工厂模式它的领域中同其他模式的不同之处在于它并没有明确要求我们使用一个构造器。取而代之，一个工厂能提供一个创建对象的公共接口，我们可以在其中指定我们希望被创造的工厂对象的类型。

#### 1.2 为什么需要工厂模式

假设我们需要通过一个类来换取不同的对象实例，可能会写出如下代码：

```js
class Dog{
  draw(){
      console.log('this is Dog');
  }
}
class Cat{
    draw() {
        console.log('this is Cat');
    }
}
class Pig{
     draw() {
        console.log('this is Pig');
    }
}
class Animal{
    getTypeAnimal(type){
        switch(type){
            case 'dog':
                return new Dog();
             case 'cat':
                return new Cat();
             case 'pig':
                return new Pig()
        }
    }
}
```

上面的代码中我们通过`Animal`类并为其提供了一个获取不同实例对象的方法`getTypeAnimal`。在使用时我们只需要`new Animal`， 然后通过这个工厂类实例对象提供的接口，传入不同的type，就可以给我们返回不同的实例对象。

```js
 const animal = new Animal();
 dog = animal.getTypeAnimal('dog');
 cat = animal.getTypeAnimal('cat');
 pig = animal.getTypeAnimal('pig')
```

上面的代码中不是很优雅， 当我们需要工厂类需要生产的类越多，switch要加更多的判断。此时我们可以通过ES6的新的数据结构来建立type 和 类的联系，方便直接获取到对应的实例对象;

假设我们有如上的三个基本类,那么我们可以写成如下代码

```js
class Animal {
      constructor() {
          // 创建一个map
          const map = new Map();
          // 通过map的set链式设置对应的键值对
          map.set('dog', Dog).set('cat', Cat).set('pig', Pig);
          // 将map挂载实例对象
          this.AnimalMap = map;
      }
      getTypeAnimal(type) {
          // 返回type 对应的实例对象
          return new (this.AnimalMap.get(type))
      }
      add(type,target) {
          // 新增type对应的类
          this.AnimalMap.set(type, target)
      }
  }
  const animal = new Animal();
  let dog = animal.getTypeAnimal('dog'),
      cat = animal.getTypeAnimal('cat'),
      pig = animal.getTypeAnimal('pig');
  class Cow{}
 animal.add('cow', Cow);// 添加一个新的动物类
 let cow = animal.getTypeAnimal('cow', Cow);
 console.log(cow);// Cow{}
```

上面的代码我们通过ES6的Map加强数据结构，来保存每给类型所对应的类，通过键值对来设置type对应的类, 然后当我们获取是的时候通过map的get方法获取type所对应的类，然后通过new 返回出去。这种写法更加优雅,减少了代码的耦合性,更利于维护。

#### 1.3工厂模式的作用

使用工厂模式的好处是显而易见的,比如实例的生产比较复杂， 或者说生成实例后后需要额外的加工，这个时候工厂给了我们一个统一的出入口,也方便了日后对这个实例的修改.比如你要修改工厂产出是一个实例的时候，就不需要在所有的类中修改而只需要在工厂出口修改就可以达到目标,较大了提高了我们开发的效率。

#### 1.4 工厂模式的应用场景

1. 对象的创建过程/ 实例化准备工作很复杂，需要初始化很多参数，查询数据库等。
2. 类本身有好多子类，这些类的创建过程在业务中很容易发生改变，或者对类的调用容易发生改变。

