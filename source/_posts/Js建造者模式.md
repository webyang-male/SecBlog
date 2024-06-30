---
title: Js建造者模式
date: 2024-05-11 14:33:12
tags: [JavaScript,设计模式]
category: Developer
---

### 1. 建造者模式

建造者模式：将一个复杂对象的构建和它的表示分离， 使得同样的构建和创建出不同的表示。当我们构建的对象内部结构非常复杂时，利用建造者模式将内部各模块分开创建就非常合适。

#### 1.1 为什么要用建造者模式?

1. 客户端不必知道产品内部组成的细节, 将产品本身和产品的创建过程解耦,使得相同的创建过程可以创建标题的重排对象。
2. 每一个建造者都相对独立，而已其他的具体建造者无关，因此可以很方便的替换具体建造者或增加新的具体的建造者。
3. 可以更加精细的控制重排的创建过程。将复杂重排的创建步骤分解在不同的方法中，使得创建过程更加精细,也更方便使用程序控制创建过程。

#### 1.2 起步

建造者模式看名字我们首先想到的就是造房子。建造者模式就像是施工团队，包工头和客户沟通建房的具体建房需细节，然后在自己团队内部发布任务，将复杂的建房工程分成了若干小组，各小组分工合作最终得到需求的房子。

假设我们需要建设一套6人住，150平方m²，中式风格的房子，此时我们使用建造者模式就非常合适。

```js
 let Builder = (function () {
     // 决定房子入住人数
     function rooms(peopleCount) {
         if(peopleCount <= 0) throw new Error("入住人数异常");
         this.peopleCount = peopleCount < 3 ? 2 : peopleCount 
     }
     //决定房子面积
     function setArea(area){
          if(area <= 20) throw Error("房子面积过小")
         this.area = area
     }
     //决定房子风格
     function style(style){
         this.style = style
     }
     return class{
         constructor(PeopleCount,area,Style){
             // 住几人，预算多少(万)，风格
             rooms.call(this, PeopleCount)
             setArea.call(this, area);
             style.call(this, Style)
         }
     }
 })()
 let bighouse = new Builder(3,100,'中式'),
	smallHouse = new Builder(3,50,'欧式'); 
```

关键点：

```js
let Builder = (function () {
    //表示部分可以独立的进行维护和修改，而不受构建部分的约束
    function rooms(){}
    function setArea(){}
    function style(){}
    //构建部分
    return class {
    }
})();
```

通过上面的例子我们也对建造者模式的概念用来一定的了解，Jquery内部就用到了建造者模式，jQuery的美元标记为动态构建新的jQuery（和DOM）对象提供了大量可以让我们这样做的不同的方法，可以通过给一个元素传入完整的标签，也可以是部分标签还有内容，或者使用jQuery来进行构造。

建造者模式使得我们仅仅只通过定义对象的类型和内容，就可以构建复杂的对象，为我们屏蔽了明确创造或展现对象的过程。

下面是一个简单的构建Dom元素的demo：

```js
 let BuilddEle = ( function (params) {
     		// 构建dom元素
            function  createEle(eleName) {
                this.ele = document.createElement(eleName);
            }
     		// 渲染dom元素的文本
            function  setText(text) {
                this.ele.textContent = text;
            }
     		// 设置dom元素的样式
            function  setStyle(style) {
                Object.entries(style).forEach(([key,val]) =>{
                    // 如果要设置的属性为数组中的某项,
                    if (["width", "height","margin","padding"].includes(key)) {
                        if(typeof val !== "string") throw new Error( key + '--prototype type Error');
                         if(!val.includes("px")){
                           console.warn(key + "应该添加px结尾");
                           this.ele.style[key] = val + "px";
                        }
                        this.ele.style[key] = val;
                       
                    } else {
                        this.ele.style[key] = val
                    }
                })
            }
     		// 设置dom元素的属性
            function setAttr(attrS){
                // 将要设置的对象的键值对进行遍历,并解构
               Object.entries(attrS).forEach( ([key,val]) =>{
                  this.ele.setAttribute(key,val)
               })
            }
            return  class{
              constructor(eleName,text,styleS,attrS){
                  // 构建dom元素的部分
                    createEle.call(this,eleName);
                    setText.call(this,text);
                    setStyle.call(this, styleS);
                    setAttr.call(this,attrS)
              }
                // 将构建的dom元素渲染到指定的目标元素上
              render(target){
                  //如果传入的是一个dom元素
                    if(target instanceof Node){
                        target.appendChild(this.ele)
                        // 如果传入
                    }else if(typeof target === "string"){
                        let targelEle =  document.querySelector(target);
                        // 如果获取的dom元素为空则抛出错误
                        if(targelEle === null) throw new Error('the target element was not obtained');
                        targelEle && targelEle.appendChild(this.ele);
                    }else{
                         document.body.append(this.ele)
                    }
              }
          }
        })()
        let style = { width: 100, height: 100, color: "white", backgroundColor: "red" }
        let div = new BuilddEle('div',"ddd", style,{class:'age'});
        div.render()
```

`总结`: 当我们构造的对象，内部结构非常复杂时，使用建造者模式将内部模块分开创建就非常合适。

