---
title: C自定义类型进阶
tags: C
categories:
  - - 后端
    - C
description: 结构体+枚举+联合
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 62900
date: 2021-05-08 00:56:29
---

### 大纲

#### 结构体

- 结构体类型的声明
- 结构的自引用
- 结构体变量的定义和初始化
- 结构体内存对齐
- 结构体传参
- 结构体实现位段（位段的填充&可移植性）

#### 枚举

- 枚举类型的定义
- 枚举的优点
- 枚举的使用

#### 联合

- 联合类型的定义
- 联合的特点
- 联合大小的计算

------

### 结构体

#### 结构的基础概念

> 结构是一些值的集合，这些值称为成员变量。结构的每个成员可以是不同类型的变量。

#### 结构的声明

```c
struct tag
{
member-list;
}variable-list;
```

定义一个学生：

````c
#define _CRT_SECURE_NO_WARNINGS 1

#include <string.h>

struct Stu
{
	char name[20];//名字
	char tele[12];//电话
	char sex[10];//性别
	int age;
} s4,s5,s6;//全局变量

struct Stu s3;//全局变量

int main()
{
	//创建的结构体变量
	struct Stu s1;
	struct Stu s2;

	return 0;
}
````

##### <font style="color:tomato;">特殊声明</font>

在声明结构的时候，可以不完全的声明。

<div class="warning">
<blockquote>
<p>不建议这么使用</p>
</blockquote>
</div>

```c
//匿名结构体类型
struct
{
	int a;
	char b;
	float c;
}x;

struct
{
	int a;
	char b;
	float c;
}a[20], *p;
```

<font style="color:skyblue;">上面的两个结构在声明的时候省略掉了结构体标签（tag）。</font>

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

struct
{
	int a;
	char c;
}sa;

struct
{
	int a;
	char c;
}* psa;

int main()
{
	psa = &sa;//编译器会给出警告
	return 0;
}
````

⚠️<font style="color:red;">编译器会把上面的两个声明当成完全不同的两个类型。 所以是非法的。</font>

#### 结构的自引用

在结构中包含一个类型为该结构本身的成员

````c
//代码1
struct Node
{
	int data;
	struct Node next;
};
//不可行
//sizeof(struct Node)大小未知
````

正确的自引用方式：

````c
//代码2
struct Node
{
	int data;//4
	struct Node* next;//4/8
};
````

注意：

```c
//代码3
typedef struct
{
int data;
Node* next;
}Node;
//不可行

//解决方案：
int main()
{
	psa = &sa;
	return 0;
}

typedef struct Node
{
	double d;
	int data;//4
	struct Node* next;//4/8
}Node;

int main()
{
	struct Node n1;
	Node n2;

	return 0;
}
```

#### 结构体变量的定义和初始化

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

struct T
{
	double weight;
	short age;
};

struct S
{
	char c;
	struct T st;
	int a;
	double d;
	char arr[20];
};

int main()
{
	//struct S s = {'c', 100, 3.14, "hello bit"};
	struct S s = { 'c', {55.6, 18}, 100, 3.14, "hello bit" };

	printf("%c %d %lf %s\n", s.c, s.a, s.d, s.arr);
	printf("%lf\n", s.st.weight);

	return 0;
}
````

````c
struct Point
{
	int x;
	int y;
}p1; //声明类型的同时定义变量p1

struct Point p2; //定义结构体变量p2

//初始化：定义变量的同时赋初值。
struct Point p3 = { x, y };

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
````

#### 结构体内存对齐

计算结构体的大小。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

struct S1
{
	char c1;//对齐数1
	int a;//对齐数4 / 8 = 4,前面浪费3,偏移量为1+3+4=8
	char c2;//对齐数1 / 8 = 1,偏移量为8+1=9
  //此时偏移合计为9,但不是成员最大对齐数(4)的倍数
};

struct S2
{
	char c1;//1
	char c2;//1
	int a;//偏移起始为4,前面浪费空余2字节,对齐数4 / 8 = 4
  //对齐数共计为8
};

struct S3
{
	double d;//8
	char c;//1 / 8 = 1,对齐数为1,到这里偏移为9
	int i;//4 / 8 = 4,对齐数为4,到这里偏移为12
  //对齐数12+4=16
};

struct S4
{
	char c;//1
	struct S3 s3;//s3偏移量最大为8,这里8的倍数就是16,前面浪费7个字节,偏移量8+18=24
	double d;// 8 /8 = 8
  //结构体的整体大小就是所有最大对齐数（含嵌套结构体的对齐数）的整数倍。
  //合计32
};

int main()
{
	struct S1 s1 = {0};
  //结构体总大小为最大对齐数（每个成员变量都有一个对齐数）的整数倍=>4*3=12
	printf("%d\n", sizeof(s1));//12
	struct S2 s2 = { 0 };
	printf("%d\n", sizeof(s2));//8
	//struct S3 s3;
	//printf("%d\n", sizeof(s3));
	/*struct S4 s4;
	printf("%d\n", sizeof(s4));*/
	return 0;
}
````

##### 结构体的对齐规则：

> 1. 第一个成员在与结构体变量偏移量为0的地址处。
>
> 2. 其他成员变量要对齐到某个数字（对齐数）的整数倍的地址处。
>
>
>   对齐数 = 编译器默认的一个对齐数 与 该成员大小的较小值。
>
>   - VS中默认的值为8
>     Linux中的默认值为4(官方说法是没有)
>
> 
>
>   3. 结构体总大小为最大对齐数（每个成员变量都有一个对齐数）的整数倍。
>   4. 如果嵌套了结构体的情况，嵌套的结构体对齐到自己的最大对齐数的整数倍处，结构体的整体大小就是所
>
>     有最大对齐数（含嵌套结构体的对齐数）的整数倍。

##### <font style="color:gold;">Q&A 为什么存在内存对齐?</font>

> 1. 平台原因(移植原因)： 不是所有的硬件平台都能访问任意地址上的任意数据的；某些硬件平台只能在某些地址
> 处取某些特定类型的数据，否则抛出硬件异常。
> 2. 性能原因： 数据结构(尤其是栈)应该尽可能地在自然边界上对齐。 原因在于，为了访问未对齐的内存，处理器
> 需要作两次内存访问；而对齐的内存访问仅需要一次访问。

<font style="color:yellowgreen;">结构体的内存对齐是拿空间来换取时间的做法。</font>

在设计结构体的时候，我们既要满足对齐，又要节省空间:

````c
//例如：
struct S1
{
	char c1;
	int i;
	char c2;
};

struct S2
{
	char c1;
	char c2;
	int i;
};
````

S1和S2类型的成员一模一样，但是S1和S2所占空间的大小有了一些区别。

##### 修改默认对齐数

`#pragma `这个预处理指令，可以改变我们的默认对齐数。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

////设置默认对齐数位4
//#pragma pack(4)
//struct S
//{
//	char c1;//1
//	//3,原1+7+4=12
//	double d;//8 4 4
//};
//#pragma pack()
////取消设置的默认对齐数


//设置默认对齐数位1
#pragma pack(1)
struct S
{
	char c1;//1
	//3,原1+7+8=16
	double d;//8 4 4
};
#pragma pack()
//取消设置的默认对齐数

int main()
{
	struct S s;
	printf("%d\n", sizeof(s));//

	return 0;
}
````

**结论：**
		结构在对齐方式不合适的时候，我么可以自己更改默认对齐数。一般设置2的次方数

##### 百度笔试题：

<div class="info">
<blockquote>
<p>写一个宏，计算结构体中某变量相对于首地址的偏移，并给出说明</p>
</blockquote>
</div>
考察： offsetof 宏的实现

> 求某个结构体的特定成员在结构体里面的偏移量
>
> C 库宏 **offsetof(type, member-designator)** 会生成一个类型为 **size_t** 的整型常量，它是一个结构成员相对于结构开头的字节偏移量。成员是由 member-designator 给定的，结构的名称是在 type 中给定的。

````c
offsetof(type, member-designator)
````

**参数**

- ​		type -- 这是一个 class 类型，其中，member-designator 是一个有效的成员指示器。
- ​		member-designator -- 这是一个 class 类型的成员指示器。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stddef.h>

struct S
{
	char c;
	int i;
	double d;
};

int main()
{
	//offsetof();
	printf("%d\n", offsetof(struct S, c));//0
	printf("%d\n", offsetof(struct S, i));//4
	printf("%d\n", offsetof(struct S, d));//8

	return 0;
}
````

**试题解析**

````c
#define offsetof(data,member)((size_t)&(((type*)0)->member))
````

- 先假设结构体的首地址从0开始
- 然后将type转换成指针指向它的成员
- 然后取这个成员的地址
- 然后将其转换为size_t的类型，即可求得它相对于首地址的偏移量

#### 结构体传参

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

struct S
{
	int a;
	char c;
	double d;
};

void Init(struct S* ps)
{
	ps->a = 100;
	ps->c = 'w';
	ps->d = 3.14;
}

//传值
void Print1(struct S tmp)
{
	printf("%d %c %lf\n", tmp.a, tmp.c, tmp.d);
}

//传址
//const保护外部s地址数据不可更改
void Print2(const struct S* ps)
{
	printf("%d %c %lf\n", ps->a, ps->c, ps->d);
}

int main()
{
	struct S s = {0};
	Init(&s);
	Print1(s);
	Print2(&s);

	/*s.a = 100;
	s.c = 'w';
	s.d = 3.14;

	printf("%d\n", s.a);*/
	return 0;
}
````

##### Q&A 

🌱上面的print1 和print2 函数哪个好些？

首选print2函数。 

**原因：**

> 函数传参的时候，参数是需要压栈，会有时间和空间上的系统开销。
> 	   如果传递一个结构体对象的时候，结构体过大，参数压栈的的系统开销比较大，所以会导致性能的下降。

<font style="color:deepskyblue;">结论： 结构体传参的时候，要传结构体的地址。</font>



#### 位段

##### 概念

> C语言允许在一个结构体中以位为单位来指定其成员所占内存长度，这种以位为单位的成员称为“位段”或称“位域”( bit field) 。利用位段能够用较少的位数存储数据。

位段的声明和结构是类似的，有两个不同：

​             1.位段的成员必须是int、unsigned int 或signed int 。
​					2.位段的成员名后边有一个冒号和一个数字。

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

//位段 - 二进制位
struct S
{
	//整型int 4字节 32位
	//位段后面数字不能大于32
	//2+5+10=17位
	int a : 2;
	int b : 5;
	int c : 10;
	int d : 30;
};

//47bit - 6个字节*8 = 48bit

int main()
{
	struct S s;
	printf("%d\n", sizeof(s));//空间大小8个字节

	return 0;
}
```

##### ✏️ 位段的内存分配

1. 位段的成员可以是int unsigned int signed int 或者是char （属于整形家族）类型
2. 位段的空间上是按照需要以4个字节（ int ）或者1个字节（ char ）的方式来开辟的。
3. 位段涉及很多不确定因素，位段是不跨平台的，注重可移植的程序应该避免使用位段。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

struct S
{
	char a : 3;
	char b : 4;
	char c : 5;
	char d : 4;
};

int main()
{
	struct S s = {0};

	s.a = 10;
	s.b = 20;
	s.c = 3;
	s.d = 4;

	return 0;
}
````

![7d425b321680c3efc9f3307322462a67.jpg](https://s1.imagehub.cc/images/2021/05/09/7d425b321680c3efc9f3307322462a67.jpg)

##### <font style="color:orange;">位段的跨平台问题</font>

1. int 位段被当成有符号数还是无符号数是不确定的。
2. 位段中最大位的数目不能确定。（16位机器最大16，32位机器最大32，写成27，在16位机器会出问题。
3. 位段中的成员在内存中从左向右分配，还是从右向左分配标准尚未定义。
4. 当一个结构包含两个位段，第二个位段成员比较大，无法容纳于第一个位段剩余的位时，是舍弃剩余的位还是利用，这是不确定的。

##### ✍总结：

跟结构相比，位段可以达到同样的效果，但是可以很好的节省空间，但是有跨平台的问题存在。



### 枚举

枚举顾名思义就是一一列举。把可能的取值一一列举。

<details>
  <summary>举个🌰</summary>
 <p>
   一周的星期一到星期日是有限的7天，可以一一列举。
  </p>
   <p>
   性别有：男、女、保密，也可以一一列举。
  </p>
   <p>
  月份有12个月，也可以一一列举
  </p>
   <p>
 颜色也可以一一列举。
  </p>
</details>

#### 枚举类型的定义

```v
enum Day//星期
{
	Mon,
	Tues,
	Wed,
	Thur,
	Fri,
	Sat,
	Sun
};
enum Sex//性别
{
	MALE,
	FEMALE,
	SECRET
}；

enum Color//颜色
{
	RED,
	GREEN,
	BLUE
};
```

以上定义的enum Day ， enum Sex ， enum Color 都是枚举类型。 {}中的内容是枚举类型的可能取值，也叫枚举常量。
	   这些可能取值都是有值的，<font style="color:skyblue;">默认从0开始，一次递增1，</font>当然在定义的时候也可以赋初值。

 例如：

````c
enum Color//颜色
{
	RED=1,
	GREEN=2,
	BLUE=4
};
````

#### 枚举的优点

1. 增加代码的可读性和可维护性
2. 和#define定义的标识符比较枚举有类型检查，更加严谨。
3. 防止了命名污染（封装）
4. 便于调试
5. 使用方便，一次可以定义多个常量

#### 枚举的使用

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

//枚举类型
//enum Sex
//{
//	//枚举的可能取值-常量
//	MALE,
//	FEMALE = 9,
//	SECRET
//};
//
//enum Color
//{
//	RED,//0
//	GREEN,//1
//	BLUE//2
//};
//
//c语言的源代码---->可执行程序
#define RED 0
#define GREEN 1
#define BLUE 2

int main()
{
	//enum Sex s = MALE;

	//enum Color c = 2;//int 

	int color = RED;

	//printf("%d %d %d\n", RED, GREEN, BLUE);
	//printf("%d %d %d\n", MALE, FEMALE, SECRET);
	return 0;
}
````

#### 枚举大小

> 主流编译器如：gcc、vc、MinGW-gcc等枚举变量均为4字节。少量编译器会根据枚举个数做优化，如只有3个枚举值时，size可能为1。

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

enum Sex
{
	MALE,
	FEMALE,
	SECRET
};

int main()
{
	enum Sex s = MALE;
	printf("%d\n", sizeof(s));

	return 0;
}
```

### 联合（共用体）

#### 联合类型的定义

联合也是一种特殊的自定义类型 这种类型定义的变量也包含一系列的成员，特征是这些成员公用同一块空间（所以联合也叫共用体）。

```c
//联合类型的声明
union Un
{
	char c;
	int i;
};
//联合变量的定义
union Un un;
//计算连个变量的大小
printf("%d\n", sizeof(un));
```

#### 联合的特点

> 联合的成员是共用同一块内存空间的，这样一个联合变量的大小，至少是最大成员的大小（因为联合至少得有能力保存最大的那个成员）。

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

union Un
{
	char c;//1
	int i; //4
};
//5个字节

int main()
{
	union Un u;
	printf("%d\n", sizeof(u));//4

	printf("%p\n", &u);

	printf("%p\n", &(u.c));
	printf("%p\n", &(u.i));

	return 0;
}
```

![ffbbb3f41a28459c5d07338808bfd90e.png](https://s1.imagehub.cc/images/2021/05/09/ffbbb3f41a28459c5d07338808bfd90e.png)_联合体示例运行结果截图

#### 面试题

判断当前计算机的大小端存储

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

//int check_sys()
//{
//	int a = 1;
//	//返回1，表示小端
//	//返回0，表示大端
//	return *(char*)&a;
//}

int check_sys()
{
	union
	{
		char c;
		int i;
	}u;

	u.i = 1;//
	//返回1，表示小端
	//返回0，表示大端
	return u.c;
}

int main()
{
	//int a = 0x11223344;

	//低地址-------------------->高地址
	//....[][][][][11][22][33][44][][][][][][][]...  大端字节序存储模式
	//....[][][][][44][33][22][11][][][][][][][]...  小端字节序存储模式
	//讨论一个数据，放在内存中的存放的字节顺序
	//大小端字节序问题
	
	int a = 1;
	int ret = check_sys();

	if (1 == ret)
	{
		printf("小端\n");
	}
	else
	{
		printf("大端\n");
	}

	return 0;
}                                                                                                         
```

#### 联合大小的计算

- 联合的大小至少是最大成员的大小。
- 当最大成员大小不是最大对齐数的整数倍的时候，就要对齐到<font style="color:tomato;">最大对齐数的整数倍</font>。

代码🌰

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>
#include <stdio.h>

union Un
{
	int a;//4字节 8 4
	char arr[5];//5字节 1 8 1
};

int main()
{
	union Un u;
	printf("%d\n", sizeof(u));

	return 0;
}
```

