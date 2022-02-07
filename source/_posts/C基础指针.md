---
title: C基础指针
tags: C
categories:
  - - 后端
    - C
description: 'C基础指针,指针初识'
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 51113
date: 2021-04-01 23:01:35
---

### 大纲

1. 指针是什么
2. 指针和指针类型
3. 野指针
4. 指针运算
5. 指针和数组
6. 二级指针
7. 指针数组

------

**指针是什么？**

在计算机科学中，指针（Pointer）是编程语言中的一个对象，利用地址，它的值直接指向（points to）存在电脑存储器中另一个地方的值。由于通过地址能找到所需的变量单元，可以说，地址指向该变量单元。因此，将地址形象化的称为“指针”。意思是通过它能找到以它为地址的[内存单元](https://baike.baidu.com/item/内存单元/7914266)。

### **指针**

> 指针是个变量，存放内存单元的地址（编号）。

代码实例:

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 10;//在内存中开辟一块空间
	int *p = &a;//这里我们对变量a，取出它的地址，可以使用&操作符。
	//将a的地址存放在p变量中，p就是一个之指针变量。
	printf("%d\n",*p);//10
	return 0;
}
````

✍<font style="color:gold;">总结：指针就是变量，用来存放地址的变量。（存放在指针中的值都被当成地址处理）。</font>

**问题**

一个小的单元到底是多大？     1个字节


如何编址？

经过仔细的计算和权衡我们发现一个字节给一个对应的地址是比较合适的。
	   对于32位的机器，假设有32根地址线，那么假设每根地址线在寻址的是产生一个电信号正电/负电（1或者0）

那么32根地址线产生的地址就会是：

````c
00000000 00000000 00000000 00000000
00000000 00000000 00000000 00000001
...
11111111 11111111 11111111 11111111
````

<font style="color:skyblue;">那么就有2的32次方个地址。</font>
	   每个地址标识一个字节，那我们就可以给（2^32Byte == 2^32/1024KB == 2^32/1024/1024MB == 2^32/1024/1024/1024GB == 4GB） 4G的空闲进行编址。

**这里我们就明白：**

<font style="color:pink;">在32位的机器上</font>，地址是32个0或者1组成二进制序列，那地址就得用4个字节的空间来存储，所以一个指针变量的大小就应该是4个字节。

<font style="color:pink;">那如果在64位机器上</font>，如果有64个地址线，那一个指针变量的大小是8个字节，才能存放一个地址。

#### 总结：

指针是用来存放地址的，地址是唯一标示一块地址空间的。
	   指针的大小在32位平台是4个字节，在64位平台是8个字节。

#### 指针和指针类型

变量有不同的类型，整形，浮点型等。那指针有没有类型呢？ 

准确的说：有的。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//32位系统平台,所以输出为4(字节)
	printf("%d\n", sizeof(char*));
	printf("%d\n", sizeof(int*));
	printf("%d\n", sizeof(short*));
	printf("%d\n", sizeof(double*));
	printf("%d\n", sizeof(float*));
	printf("%d\n", sizeof(long*));
	return 0;
}
```

这里可以看到，指针的定义方式是： `type + *` 。 其实： ` char* `类型的指针是为了存放  `char` 类型变量的地址。  `short* `类型的指针是为了存放  `short `类型变量的地址。  `int* `类型的指针是为了存放`int `类型变量的地址。

#### 指针类型的意义

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
  int a = 0x11223344;
	int* pa=&a;
	char* pc = &a;
	//输出结果都一样
	//warning 警告: “初始化”: 从“int *”到“char *”的类型不兼容
	printf("%d\n", pa);
	printf("%d\n", pc);

	return 0;
}
```

```c
//例2

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
//vs F10进行程序调试查看int 和 char类型指针区别
int main()
{
	int a = 0x11223344;
	//int* pa=&a;
	char* pc = &a;
	*pa = 0;

	return 0;
}
```

例2结果图示:

[![-2021-04-15-144738.png](https://s1.imagehub.cc/images/2021/04/15/-2021-04-15-144738.png)](https://www.imagehub.cc/image/M7uh1)
[![-2021-04-15-145036.png](https://s1.imagehub.cc/images/2021/04/15/-2021-04-15-145036.png)](https://www.imagehub.cc/image/M7E0R)

✍**指针类型总结:**

​	<font style="color:skyblue;">指针类型决定了指针进行解引用操作的时候，能够访问空间的大小</font>

`int*p`; *p能够访问4个字节

`char*p`;*p 能够访问1个字节

`double* p`; *p 能够访问8个字节

##### 指针+-整数

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 0x11223344;
	int* pa = &a;
	char* pc = &a;

	printf("%p\n", pa);//005BFBB0
	printf("%p\n", pa + 1);//005BFBB4

	printf("%p\n", pc);//005BFBB0
	printf("%p\n", pc + 1);//005BFBB1
	return 0;
}
```

✍<font style="color:orange;">总结：指针的类型决定了指针向前或者向后走一步有多大/步长（距离）。</font>

```c
int*p; p+1—>4

char*p;p+1—>1

double* p; p+1—>8
```

### 野指针

> 概念： 野指针就是指针指向的位置是不可知的（随机的、不正确的、没有明确限制的）

#### 野指针成因

1. 指针未初始化

```c
#include <stdio.h>
int main()
{
	int *p;//局部变量指针未初始化，默认为随机值
	*p = 20;
	return 0;
}
```

2. 指针越界访问

```c
#include <stdio.h>
int main()
{
	int arr[10] = { 0 };
	int *p = arr;
	int i = 0;
	for (i = 0; i <= 11; i++)
	{
		//当指针指向的范围超出数组arr的范围时，p就是野指针
		*(p++) = i;
	}
	return 0;
}
```

3. 指针指向的空间释放

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int* test()
{
	int a = 10;//函数内临时变量a,占4个字节空间,出函数空间还给系统
	return &a;
}

int main()
{
	int *p = test();
	*p = 8;
	return 0;
}
```

#### 如何规避野指针

1. 指针初始化
2. 小心指针越界
3. 指针指向空间释放即使置NULL
4. 指针使用之前检查有效性

### 指针运算

- 指针+- 整数
- 指针-指针
- 指针的关系运算

#### 指针+-整数

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
	int i = 0;
	int sz = sizeof(arr) / sizeof(arr[0]);
	int* p = arr;
	for (i = 0; i < sz; i++)
	{
		printf("%d ", *p);
		p = p + 1;//p++;
	}
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
	int i = 0;
	int sz = sizeof(arr) / sizeof(arr[0]);
	int* p = &arr[9];//这里指向元素10的地址
	for (i = 0; i < 5; i++)
	{
		printf("%d ", *p);//10 8 6 4 2
		p -= 2;
	}
	return 0;
}
```

#### 指针-指针

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char ch[5] = { 0 };
	int arr[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
	//指针-指针得到的结果是中间元素个数
	printf("%d\n", &arr[9] - &arr[0]);//9
	printf("%d\n", &arr[0] - &arr[9]);//-9

	printf("%d\n", &arr[9] - &ch[0]);//err,结果是不可预知的
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法3--指针-指针实现strlen效果
int my_strlen(char* str)
{
	char* start = str;
	char* end = str;
	while (*end != '\0')
	{
		end++;
	}
	return end - start;
}
int main()
{
	//strlen - 求字符串长度
	//递归 - 模拟实现了strlen - 计数器的方式1,递归的方式2
	char arr[] = "bit";//bit\0
	int len = my_strlen(arr);
	printf("%d\n",len );
	return 0;
}
```

#### 指针的关系运算

```c
for(vp = &values[N_VALUES]; vp > &values[0];)
{
*--vp = 0;
}
```

![45d4028976b4d0508e4464c357d96f23.png](https://s1.imagehub.cc/images/2021/04/15/45d4028976b4d0508e4464c357d96f23.png)

代码简化, 这将代码修改如下：

```c
for(vp = &values[N_VALUES-1]; vp >= &values[0];vp--)
{
*vp = 0;
}
```

<font style="color:tomato;">简化方法实际在绝大部分的编译器上是可以顺利完成任务的，然而我们还是应该避免这样写，因为标准并不保证
它可行。</font>

💠**标准规定：**

允许指向数组元素的指针与指向数组最后一个元素后面的那个内存位置的指针比较，但是不允许与指向第一个元素之前的那个内存位置的指针进行比较。

**解释图例:**

[![-2021-04-15-230844.png](https://s1.imagehub.cc/images/2021/04/15/-2021-04-15-230844.png)](https://www.imagehub.cc/image/MuRc2)

arr为数组,p3为数组第一个指针空间之前的指针,p2为数组最后一个指针后面空间的指针,p1为数组中某个空间位置的指针

<font style="color:deepskyblue;">标准规定用图例来说明就是,p1可以和p2比,p1不能和p3比</font>

### 指针和数组

数组名是什么？

代码实例：

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 };
	printf("%p\n", arr);
	printf("%p\n", &arr[0]);
	return 0;
}
```

![a2bf5e68e15abb5e3627c0a17181c3f7.png](https://s1.imagehub.cc/images/2021/04/15/a2bf5e68e15abb5e3627c0a17181c3f7.png)

​		可见数组名和数组首元素的地址是一样的。

✍**结论：**

​		<font style="color:pink;">数组名表示的是数组首元素的地址。</font>

那么这样写代码是可行的：

```c
int arr[10] = {1,2,3,4,5,6,7,8,9,0};
int *p = arr;//p存放的是数组首元素的地址
```

⭐<font style="color:orange;">特殊情况:</font>

1. &arr- &数组名-数组名不是首元素的地址-数组名表示整个数组–&数组名取出的是整个数组的地址
2. sizeof(arr) - sizeof(数组名)～数组名表示的整个数组- sizeof(数组名)计算的是整个数组的大小

<font style="color:deepskyblue;font-size:18px">既然可以把数组名当成地址存放到一个指针中，我们使用指针来访问一个数组就成为可能。</font>

```c
##define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 };
	int *p = arr; //指针存放数组首元素的地址
	int sz = sizeof(arr) / sizeof(arr[0]);
	int i = 0;
	for (i = 0; i < sz; i++)
	{
		printf("&arr[%d] = %p <====> p+%d = %p\n", i, &arr[i], i, p + i);
	}
	return 0;
} 
```

[![c.md.png](https://s1.imagehub.cc/images/2021/04/16/c.md.png)](https://www.imagehub.cc/image/MAgOx)

所以p+i 其实计算的是数组arr 下标为i的地址。那我们就可以直接通过指针来访问数组。

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	int *p = arr; //指针存放数组首元素的地址
	int sz = sizeof(arr) / sizeof(arr[0]);
	int i = 0;
	for (i = 0; i<sz; i++)
	{
		printf("%d ", *(p + i));//输出数组元素
	}
	return 0;
}
```

### 二级指针

指针变量也是变量，是变量就有地址，那指针变量的地址存放在哪里？ 这就是二级指针

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 99;
	int * pa = &a;
	int* * ppa = &pa;//ppa就是二级指针
	//int*** pppa = &ppa;//pppa就是三级指针
	printf("%p\n", pa);
	printf("%p\n", ppa);
	return 0;
}
```

![c113a303be2083419.png](https://s1.imagehub.cc/images/2021/04/16/c113a303be2083419.png)

<font style="color:orange;">a的地址存放在pa中 , pa的地址存放在ppa中。pa是一级指针，而ppa是二级指针。</font>

**对于二级指针的运算有：**

​			`*ppa` 通过对`ppa`中的地址进行解引用，这样找到的是`pa` ，` *ppa `其实访问的就是`pa` .

```c
int b = 20;
*ppa = &b;//等价于 pa = &b;
```

​		`*ppa `先通过`*ppa` 找到`pa` ,然后对`pa` 进行解引用操作： `*pa` ，那找到的是`a `.

```c
**ppa = 30;
//等价于*pa = 30;
//等价于a = 30;
```

### 指针数组

🤔指针数组是指针还是数组？
		<font style="color:lightpink;">答案：是数组。是存放指针的数组。</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 10;
	int b = 20;
	int c = 30;
	//int* pa = &a;
	//int* pb = &b;
	//int* pc = &c;

	//整型数组 - 存放整型
	//字符数组 - 存放字符
	//指针数组 - 存放指针
	//int arr[10];
	int* arr2[3] = { &a, &b, &c };//指针数组
	int i = 0;
	for (i = 0; i < 3; i++)
	{
		printf("%d ",*(arr2[i]));//10 20 30
	}
	return 0;
}
```



