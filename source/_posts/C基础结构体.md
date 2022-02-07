---
title: C基础结构体
tags: C
categories:
  - - 后端
    - C
description: "\U0001F33EC基础结构体学习笔记"
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 55291
date: 2021-04-11 15:49:20
---

### 目录

- ​	    结构体类型的声明
- ​		结构体初始化
- ​		结构体成员访问
- ​		结构体传参

### 结构体的声明

#### 结构的基础知识

> 结构是一些值的集合，这些值称为成员变量。结构的每个成员可以是不同类型的变量。

#### 结构的声明

```c
struct tag
{
member-list;
}variable-list;
```

**代码实例**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//描述一个学生--一些数据
//struct -  结构体关键字 Stu - 结构体标签 
//struct Stu - 结构体类型
//struct Stu
//{
//	//成员变量
//	char name[20];//名字
//	int age;//年龄
//	char sex[5];//性别
//	char id[20];//学号
//}s1,s2,s3;//分号不能丢
////s1,s2,s3是3个全局结构体变量--全局变量应该少用


//换个写法
typedef struct Stu
{
	//成员变量
	char name[20];//名字
	int age;//年龄
	char sex[5];//性别
	char id[20];//学号
}Stu;//Stu在这里被改为Stu

int main()
{
	//创建结构体变量
	struct Stu s1;//局部结构体变量
	Stu s2;//typedef方法
	return 0;
}
```

#### 结构成员的类型

结构的成员可以是标量(普通变量)、数组、指针，甚至是其他结构体。

### 结构体变量的定义和初始化

```c
struct Point
{
	int x;
	int y;
}p1; //声明类型的同时定义变量p1
struct Point p2; //定义结构体变量p2
//初始化：定义变量的同时赋初值。
struct Point p3 = { x,y };

struct Stu //类型声明
{
	char name[15];//名字
	int age; //年龄
};
struct Stu s = { "zhangsan", 20 };//初始化

struct Node
{
	int data;
	struct Point p;
	struct Node* next;
}n1 = { 10, { 4, 5 }, NULL }; //结构体嵌套初始化
struct Node n2 = { 20, { 5, 6 }, NULL };//结构体嵌套初始化
```

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

struct S
{
	int a;
	char c;
	char arr[20];
	double d;
};

struct T
{
	char ch[10];
	struct S s;
	char *pc;
};

int main()
{
	char arr[] = "hello learner\n";
	struct T t = { "study", {100, 'w', "hello world", 3.14}, arr};
	printf("%s\n", t.ch);//study
	printf("%s\n", t.s.arr);//hello world
	printf("%lf\n", t.s.d);//3.14
	printf("%s\n", t.pc);//hello learner

	return 0;
}
```

### 结构体成员的访问

### 结构体传参

结构体变量访问成员 结构变量的成员是通过<font style="color:skyblue;">点操作符（.）</font>访问的。点操作符接受两个操作数。

```c
typedef struct Stu
{
	//成员变量
	char name[20];
	short age;
	char tele[12];
	char sex[5];
}Stu;


void Print1(Stu tmp)
{
	printf("name: %s\n", tmp.name);
	printf("age:  %d\n", tmp.age);
	printf("tele: %s\n", tmp.tele);
	printf("sex:  %s\n", tmp.sex);
}

void Print2(Stu* ps)
{
	printf("name: %s\n", ps->name);
	printf("age : %d\n", ps->age);
	printf("tele: %s\n", ps->tele);
	printf("sex : %s\n", ps->sex);
}

int main()
{
	Stu s = { "李四", 40, "15598886688", "男" };
	//打印结构体数据
	Print1(s);
	Print2(&s);

	return 0;
}
//Print1 和 Print2 打印哪个更好？
/*
很显然是Print2
Print1的形参接收实参s,形参是实参的临时拷贝
需要花费更多时间和空间
Print2接收的是内存地址,最大消耗空间为4/8字节
*/
```

💐**标准解答**

函数传参的时候，参数是需要压栈的。 如果传递一个结构体对象的时候，结构体过大，参数压栈的的系统开销比较大，所以会导致性能的下降。

<font style="color:gold;font-size:18px;">结论： 结构体传参的时候，要传结构体的地址。</font>

