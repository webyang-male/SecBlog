---
title: C指针的进阶
tags: C
categories:
  - - 后端
    - C
description: 指针进阶学习✈️
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 24884
date: 2021-04-19 18:19:48
---

### 大纲

1. 字符指针
2. 数组指针
3. 指针数组
4. 数组传参和指针传参
5. 函数指针
6. 函数指针数组
7. 指向函数指针数组的指针
8. 回调函数
9. 指针和数组面试题的解析

------

指针的概念(基础)：

> 1. 指针就是个变量，用来存放地址，地址唯一标识一块内存空间。
> 2. 指针的大小是固定的4/8个字节（32位平台/64位平台）。
> 3. 指针是有类型，指针的类型决定了指针的+-整数的步长，指针解引用操作的时候的权限。
> 4. 指针的运算。

### 字符指针

在指针的类型中我们知道有一种指针类型为字符指针`char* `

**基本用法**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char ch = 'z';
	char* pc = &ch;
	*pc = 'y';
	
	return 0;
}
```

**其他用法**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char arr[] = "abcdef";//abcdef是一个常量字符串
	char* pc = arr;
	printf("%s\n",arr);//abcdef
	printf("%s\n", pc);//abcdef
  printf("%c\n", *pc);//a
	return 0;
}
```

<font style="color:skyblue;">代码`char* pc = arr`; 特别容易被误以为是把字符串`abcdef `放到字符指针`pc `里了，但是/本质是把字符串`abcdef `首字符的地址放到了`pc `中。</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//char* pc = 'abc';
	//*pc = 'y';//段错误/程序崩溃
	const char* pc = 'abc';//准确写法
	printf("%s\n", pc);
	return 0;
}
```

面试题

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char str1[] = "helloChaser";
	char str2[] = "helloChaser";
	char* str3 = "helloChaser";
	char* str4 = "helloChaser";
  	//准确写法
	//const char* str3 = "helloChaser";
	//const char* str4 = "helloChaser";

	if (str1 == str2)
		printf("str1 and str2 are same\n");
	else
		printf("str1 and str2 are not same\n");

	if (str3 == str4)
	{
		printf("str3 and str4 are same\n");
	}
	else
		printf("str3 and str4 are not same\n");
	return 0;

	//运行结果
	//str1 and str2 are not same
	//str3 and str4 are same
}
//改变str3和str4互不干扰
```

这里str3和str4指向的是一个同一个常量字符串。C/C++会把常量字符串存储到单独的一个内存区域，当几个指针指向同一个字符串的时候，他们实际会指向同一块内存。但是用相同的常量字符串去初始化不同的数组的时候就会开辟出不同的内存块。

### 指针数组

指针数组是一个存放指针的**数组**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10] = { 0 };//整型数组
	char ch[5] = { 0 };//字符数组
	int* parr[4];//存放整型指针的数组 - 指针数组
	char* pch[5];//存放字符指针的数组 - 指针数组
	return 0;
}
```

指针数组常见用法:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr1[] = { 1, 2, 3, 4, 5 };
	int arr2[] = { 2, 3, 4, 5, 6 };
	int arr3[] = { 3, 4, 5, 6, 7 };

	int* parr[] = { arr1, arr2, arr3 };
	int i = 0;
	for (i = 0; i < 3; i++)
	{
		int j = 0;
		for (j = 0; j < 5; j++)
		{
			printf("%d ", *(parr[i] + j));
		}
		printf("\n");
	}
	return 0;
}
```



### 数组指针

#### 数组指针的定义

​		我们已经熟悉： 整形指针：` int * pint`; 能够指向整形数据的指针。 浮点型指针： `float * pf;`能够指向浮点型数据的指针。

​		<font style="color:skyblue;">那数组指针应该是：能够指向数组的指针。</font>

```c
int *p1[10];
int (*p2)[10];
//p1, p2分别是什么？
```

**解释：**

```c
int (*p)[10];
//解释：p先和*结合，说明p是一个指针变量，然后指着指向的是一个大小为10个整型的数组。所以p是一个
指针，指向一个数组，叫数组指针。
//这里要注意：[]的优先级要高于*号的，所以必须加上（）来保证p先和*结合。
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//int *p = NULL;//p是整型指针 - 指向整型的指针 - 可以存放整型的地址
	//char* pc = NULL;//pc是字符指针 - 指向字符的指针 - 可以存放字符的地址
	//数组指针 - 指向数组的指针 - 可以存放数组的地址
	/*
	arr 首元素地址
	&arr[0] 首元素地址
	&arr 数组地址
	*/
	int arr[10] = {0,1,2,3,4,5,6,7,8,9};
	//p就是数组指针
	int (*p)[10]= &arr;//数组地址存储
	 
	/*printf("%p\n",p);
	printf("%p\n", p[0]);
	printf("%p\n", p[1]);
	printf("%p\n", p[2]);*/
	return 0;
}
```

![C.png](https://s1.imagehub.cc/images/2021/04/20/C.png)解释图例

#### &数组名和数组名

我们知道arr是数组名，数组名表示数组首元素的地址。

```c
#include <stdio.h>

int main()
{
int arr[10] = {0};
printf("%p\n", arr);
printf("%p\n", &arr);
return 0;
}
```

![Ca1bb24237b781101.png](https://s1.imagehub.cc/images/2021/04/20/Ca1bb24237b781101.png)

可见数组名和&数组名打印的地址是一样的。继续深入:

```c
#include <stdio.h>

int main()
{
	int arr[10] = { 0 };
	printf("arr = %p\n", arr);
	printf("&arr= %p\n", &arr);
	printf("arr+1 = %p\n", arr + 1);
	printf("&arr+1= %p\n", &arr + 1);
	return 0;
}
```

![C9b82c233eb9dc8a4.png](https://s1.imagehub.cc/images/2021/04/20/C9b82c233eb9dc8a4.png)

✏️根据上面的代码我们发现:

​		其实&arr和arr，虽然值是一样的，但是意义应该不一样的。

​		<font style="color:deepskyblue;">实际上： &arr 表示的是数组的地址，而不是数组首元素的地址。</font>

​		数组的地址+1，跳过整个数组的大小，所以&arr+1 相对于&arr 的差值是40.

#### 数组指针的使用

既然数组指针指向的是数组，那数组指针中存放的应该是数组的地址。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	//方法1
	int *p = arr;
	int i = 0;
	for ( i = 0; i < 10; i++)
	{
		printf("%d ",*(p+i));
	}

	
	//int(*pa)[10] = &arr;
	//int i = 0;
	////方法2
	////for ( i = 0; i < 10; i++)
	////{
	////	printf("%d ",*(*pa + i));//*pa == arr
	////}

	////方法3
	//for ( i = 0; i < 10; i++)
	//{
	//	printf("%d ", (*pa)[i]);
	//}

	return 0;
}
//其实一般都很少用上面的代码方法
```

一个数组指针的使用：

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//参数是数组形式
void print1(int arr[3][5], int x, int y)
{
	int i = 0;
	int j = 0;
	for (i = 0; i < x; i++)
	{
		//打印行
		for (j = 0; j < y; j++)
		{
			printf("%d ", arr[i][j]);
		}
		printf("\n");
	}
	
}

//参数是指针形式
void print2(int (*p)[5],int x,int y)
{
	int i = 0;
	//找到行
	for ( i = 0; i < x; i++)
	{
		int j = 0;
		//找到列 -- 每个数组中的元素
		for ( j = 0; j < y; j++)
		{
			//printf("%d ", *(*(p + i) + j));
			//p+i找到某一行的地址
			//*(p + i)解引用找到真实行数
			//通过下标[j]找到一行某个数字
			//printf("%d ", (*(p + i))[j]);

			//等价写法
			//printf("%d ", *(*(p + i)+j));
			//printf("%d ", *(p[i] + j));
			printf("%d ", p[i][j]);
		}
		printf("\n");
	}
}

int main()
{
	int arr[3][5] = { { 1, 2, 3, 4, 5 }, { 2, 3, 4, 5, 6 }, { 3, 4, 5, 6, 7 } };
	//print1(arr, 3, 5);//arr - 数组名 - 数组名就是首元素地址 -第一行一维数组的地址
	print2(arr, 3, 5);

	//int arr[10] = {1,2,3,4,5,6,7,8,9,10};
	//int i = 0;
	//int* p = arr;
	//for ( i = 0; i < 10; i++)
	//{
	//	printf("%d ",p[i]);
	//	//printf("%d ", *(p + i));
	//	//printf("%d ", *(arr + i));
	//	//printf("%d ", arr[i]);//arr[i] == *(arr + i) == *(p + i) == p[i]
	//}
	return 0;
}
```

#### 🌷回顾

```c
int arr[5];//arr是一个5个元素的整型数组
int *parr1[10];//parr1是一个数组，数组有10个元素，每个元素的类型是int*,parr1是指针数组
int(*parr2)[10];//parr2是一个指针，该指针指向了一个数组，数组有10个元素，每个元素的类型是int - parr2是数组指针
int(*parr3[10])[5];//'parr3是一个数组，该数组有10个元素，每个元素是一个数组指针,该数组指针指向的数组有5个元素，每个元素是int
```

### 数组/指针参数

#### 一维数组传参

```c
#include <stdio.h>

void test(int arr[])//ok
{}
void test(int arr[10])//ok
{}
void test(int *arr)//ok
{}
void test2(int *arr[20])//ok,这里数组大小[20]可以省略
{}
void test2(int **arr)//ok
{}
int main()
{
	int arr[10] = { 0 };
	int *arr2[20] = { 0 };
	test(arr);
	test2(arr2);
}
```

#### 二维数组传参

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void test(int arr[3][5])//ok
{}
void test(int arr[][])//err
{}
void test(int arr[][5])//ok
{}
//总结：二维数组传参，函数形参的设计只能省略第一个[]的数字。
//因为对一个二维数组，可以不知道有多少行，但是必须知道一行多少元素

void test(int *arr)//err
{}
void test(int* arr[5])//err
{}
void test(int(*arr)[5])//ok
{}
void test(int **arr)//err
{}
int main()
{
	int arr[3][5] = { 0 };
	test(arr);
	return 0;
}
```

#### 一级指针传参

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void print(int *p, int sz)
{
	int i = 0;
	for (i = 0; i<sz; i++)
	{
		printf("%d\n", *(p + i));
	}
}

int main()
{
	int arr[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	int *p = arr;
	int sz = sizeof(arr) / sizeof(arr[0]);
	//一级指针p，传给函数
	print(p, sz);
	return 0;
}
````

#### 思考：

<font style="color:lightskyblue;">当一个函数的参数部分为一级指针的时候，函数能接收什么参数?</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void test1(int* p)
{}

void test2(char* p)
{}

int main()
{
	int a = 10;
	int* p1 = &a;
	test1(&a);//ok
	test1(p1);//ok

	char ch = 'z';
	char* pc = &ch;
	test2(&ch);//ok
	test2(pc);//ok
}
```

#### 二级指针传参

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void test(int** ptr)
{
printf("num = %d\n", **ptr);
}
int main()
{
int n = 10;
int*p = &n;
int **pp = &p;
test(pp);
test(&p);
return 0;
}
```

#### 思考：

<font style="color:lightskyblue;">当一个函数的参数部分为二级指针的时候，函数能接收什么参数?</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void test(char **p)
{
}

int main()
{
	char c = 'b';
	char*pc = &c;
	char**ppc = &pc;
	char* arr[10];
	test(&pc);
	test(ppc);
	test(arr);//Ok
	return 0;
}
```

### 函数指针

例1:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//数组指针–是指向数组的指针
//函数指针–是指向函数的指针

int Add(int x ,int y)
{
	int z = 0;
	z = x + y;
	return z;
}

int main()
{
	int a = 10;
	int b = 20;
	//&函数名 和 函数名 都是函数的地址
	printf("%p\n", Add);
	printf("%p\n",&Add);
	return 0;
}
```

![c.png](https://s1.imagehub.cc/images/2021/04/21/c.png)

例2:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void Print(char* str)
{
	printf("%s\n", str);
}

int main()
{
	void(*p)(char*) = Print;
	(*p)("Be Happy");
	return 0;
}
```

#### 函数地址保存

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int Add(int x, int y)
{
	int z = 0;
	z = x + y;
	return z;
}

int main()
{
	int a = 10;
	int b = 20;

	/*int arr[10] = { 0 };
	int(*p)[10] = &arr;*/

	//&函数名 和 函数名 都是函数的地址
	//printf("%p\n", Add);
	//printf("%p\n",&Add);

	int(*pa)(int, int) = Add;
	printf("%d\n", (*pa)(512, 8));
	return 0;
}
```

#### 不寒而🌰

```c
//代码1
(*(void (*)())0)();
//把0强制类型转换成: void (*) (）函数指针类型–0就是一个函数的地址
//调用0地址处的该函数

//代码2
void (*signal(int , void(*)(int)))(int);
//简化
typedef void(*pfun_t)(int);
pfun_t signal(int, pfun_t);

//signal是一个函数声明
//signal函数的参数有2个，第一个是int。第二个是函数指针，该函数指针指向的函数的参数是int，返回类型是void
//signal函数的返回类型也是一个函数指针:该函数指针指向的函数的参数是int，返回类型是void
```

### 函数指针数组

数组是一个存放相同类型数据的存储空间

#### 函数指针的数组定义

```c
int (*parr1[10]])();
int *parr2[10]();
int (*)() parr3[10];
```

答案是：`parr1 `

parr1 先和[] 结合，说明parr1是数组

<font style="color:skyblue;">数组的内容是是: `int (*)() `类型的函数指针。</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int Add(int x, int y)
{
	return x + y;
}
int Sub(int x, int y)
{
	return x - y;
}
int Mul(int x, int y)
{
	return x * y;
}
int Div(int x, int y)
{
	return x / y;
}
int main()
{
	//指针数组
	int* arr[5];
	//需要一个数组,可以存放4个函数地址 --- 函数指针的数组
	int(*pa)(int, int) = Add;//Sub/Mul/Div
	//函数指针的数组
	int(*parr[4])(int, int) = { Add, Sub, Mul, Div };
	int i = 0;
	for (i = 0; i < 4; i++)
	{
		printf("%d\n", parr[i](2, 3));
	}
	return 0;
}
```

#### 小练习

```c
char* my_strcpy(char* dest, const char* src);
//1.写一个函数指针 pf ，能够指向my_strcpy

//2．写一个函数指针数组pfArr，能够存放4个my_strcpy函数的地址

//answer:
1.char* (*pf)(char*, const char*);
2.char* (*pfArr[4])(char*, const char*);
```

<font style="color:deepskyblue;font-size:18px;">函数指针数组的用途：转移表</font>

#### 代码实例：（简易计算器）

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void menu()
{
	printf("*************************\n");
	printf(" 1:add 2:sub \n");
	printf(" 3:mul 4:div \n");
	printf(" 5.XOR 0:exit\n");
	printf("*************************\n");
}

int Add(int x, int y)
{
	return x + y;
}

int Sub(int x, int y)
{
	return x - y;
}

int Mul(int x, int y)
{
	return x * y;
}

int Div(int x, int y)
{
	return x / y;
}

int XOR(int x, int y)
{
	return x ^ y;
}

int main()
{
	int input = 0;
	int x = 0;
	int y = 0;
	//pfArr是一个函数指针数组 - 转移表
	int(*pfArr[])(int, int) = { 0, Add, Sub, Mul, Div, XOR };
	do
	{
		menu();
		printf("请选择:>\n");
		scanf("%d", &input);
		if (input >= 1 && input<=5)
		{
			printf("请输入两个操作数:>\n");
			scanf("%d%d", &x, &y);
			int ret = pfArr[input](x, y);
			printf("%d\n", ret);
		}
		else if (input == 0)
		{
			printf("退出计算思密达!\n");
		}
		else
		{
			printf("What are you 输啥嘞!\n");
		}
		
	} while (input);
}

//int main()
//{
//	int input = 0;
//	int x = 0;
//	int y = 0;
//	do
//	{
//		menu();
//		printf("请选择:>\n");
//		scanf("%d", &input);
//		switch (input)
//		{
//		case 1:
//			printf("请输入两个操作数:>\n");
//			scanf("%d%d", &x, &y);
//			printf("%d\n", Add(x, y));
//			break;
//		case 2:
//			printf("请输入两个操作数:>\n");
//			scanf("%d%d", &x, &y);
//			printf("%d\n", Sub(x, y));
//			break;
//		case 3:
//			printf("请输入两个操作数:>\n");
//			scanf("%d%d", &x, &y);
//			printf("%d\n", Mul(x, y));
//			break;
//		case 4:
//			printf("请输入两个操作数:>\n");
//			scanf("%d%d", &x, &y);
//			printf("%d\n", Div(x, y));
//			break;
//		case 0:
//			printf("退出计算思密达!\n");
//			break;
//		default:
//			printf("What are you 输啥嘞!\n");
//			break;
//		}
//	} while (input);
//}
```

```c
void menu()
{
	printf("*************************\n");
	printf(" 1:add 2:sub \n");
	printf(" 3:mul 4:div \n");
	printf(" 5.XOR 0:exit\n");
	printf("*************************\n");
}

int Add(int x, int y)
{
	return x + y;
}

int Sub(int x, int y)
{
	return x - y;
}

int Mul(int x, int y)
{
	return x * y;
}

int Div(int x, int y)
{
	return x / y;
}

int XOR(int x, int y)
{
	return x ^ y;
}


void Calc(int(*pf)(int, int))
{
	int x = 0;
	int y = 0;
	printf("请输入两个操作数:>\n");
	scanf("%d%d", &x, &y);
	printf("结果为 = %d\n", pf(x, y));
}

int main()
{
	int input = 0;
	do
	{
		menu();
		printf("请选择:>\n");
		scanf("%d", &input);
		switch (input)
		{
		case 1:
			Calc(Add);
			break;
		case 2:
			Calc(Sub);
			break;
		case 3:
			Calc(Mul);
			break;
		case 4:
			Calc(Div);
		case 5:
			Calc(XOR);
			break;
		case 0:
			printf("退出计算思密达!\n");
			break;
		default:
			printf("What are you 输啥嘞!\n");
			break;
		}
	} while (input);
}
```



### 指向函数指针数组的指针

指向函数指针数组的指针是一个`指针` 指针指向一个`数组`，数组的元素都是`函数指针`;

```c
int main()
{
	int arr[10] = { 0 };
	int(*p)[10] = &arr;//取出数组地址

	int(*pf)(int, int);//函数指针
	int (*pfArr[4])(int, int);//pfArr是一个函数指针数组

	//ppfArr 是一个数组指针,指针指向的数组有4个元素
	//指向的数组的每个元素的类型是一个函数指针 int(*)(int, int)
	int(*(*ppfArr[4]))(int, int) = &pfArr;
	
	return 0;
}
```

### 回调函数

> 回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void print(char *str)
{
	printf("this is:%s", str);
}
void test(void(*p)(char *))
{
	printf("test\n");
	p("test");
}
int main()
{
	test(print);
	return 0;
}
```

#### qsort函数的使用：

```c
//int main()
//{
//	int a = 10;
//	//int* pa = &a;
//	//char* pc = &a;
//
//	//char ch = 'w';
//	void* p = &a;
//	//*p = 0;
//	//p++;
//
//	//p = &ch;
//	//void* 类型的指针 可以接收任意类型的地址
//	//void* 类型的指针 不能进行解引用操作
//	//void* 类型的指针 不能进行+-整数的操作
//
//	return 0;
//}

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct Stu
{
	char name[20];
	int age;
};

int cmp_int(const void* e1, const void* e2)
{
	//比较两个整形值的
	return *(int*)e1 -*(int*)e2;
}

int cmp_float(const void*e1, const void*e2)
{
	/*if (*(float*)e1 == *(float*)e2)
		return 0;
	else if (*(float*)e1 > *(float*)e2)
		return 1;
	else
		return -1;*/

	return ((int)(*(float*)e1 - *(float*)e2));//强制类型转换解决输出警告
}

int cmp_stu_by_age(const void* e1, const void* e2)
{
	return ((struct Stu*)e1)->age - ((struct Stu*)e2)->age;
}
int cmp_stu_by_name(const void*e1, const void* e2)
{
	//比较名字就是比较字符串
	//字符串比较不能直接用><=来比较，应该用strcmp函数
	return strcmp(((struct Stu*)e1)->name, ((struct Stu*)e2)->name);
}

void test1()
{
	int arr[10] = { 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 };
	int sz = sizeof(arr) / sizeof(arr[0]);
	qsort(arr, sz, sizeof(arr[0]), cmp_int);
	int i = 0;
	for (i = 0; i < sz; i++)
	{
		printf("%d ", arr[i]);
	}
}

void test2()
{
	float f[] = { 9.0, 8.0, 7.0, 6.0, 5.0, 4.0 };
	int sz = sizeof(f) / sizeof(f[0]);
	qsort(f, sz, sizeof(f[0]), cmp_float);
	int j = 0;
	for (j = 0; j < sz; j++)
	{
		printf("%f ", f[j]);
	}
}

void test3()
{
	struct Stu s[3] = { { "zhangsan", 20 }, { "lisi", 30 }, { "wangwu", 10 } };
	int sz = sizeof(s) / sizeof(s[0]);
	
	qsort(s, sz, sizeof(s[0]), cmp_stu_by_name);//cmp_stu_by_age
	//第一个参数：待排序数组的收元素地址
	//第二个参数：待排序数组的元素个数
	//第三个参数：待排序数组的每个元素的大小-单位是字节
	//第四个参数：是函数指针，比较两个元素的所用函数的地址-这个函数使用者自己实现
	//函数指针的两个参数是：待比较的两个元素的地址
}


int main()
{
	//test1();//整型排序
	//test2();//浮点排序
	test3();
	return 0;
}
```

使用回调函数，模拟实现qsort（采用冒泡的方式）。

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

//qsort函数简化结果
//void qsort(void* base,
//	size_t num,
//	size_t width,
//	int(*cmp)(const void *e1, const void *e2)
//	);

struct Stu
{
	char name[20];
	int age;
};

int cmp_stu_by_age(const void* e1, const void* e2)
{
	return ((struct Stu*)e1)->age - ((struct Stu*)e2)->age;
}

int cmp_stu_by_name(const void*e1, const void* e2)
{
	//比较名字就是比较字符串
	//字符串比较不能直接用><=来比较，应该用strcmp函数
	return strcmp(((struct Stu*)e1)->name, ((struct Stu*)e2)->name);
}

int cmp_int(const void* e1, const void* e2)
{
	//比较两个整形值
	return *(int*)e1 - *(int*)e2;
}

//实现bubble_sort函数的程序员不知道，未来排序待比较的两个元素的类型
void Swap(char* buf1, char*buf2, int width)
{
	int i = 0;
	for (i = 0; i < width; i++)
	{
		char tmp = *buf1;
		*buf1 = *buf2;
		*buf2 = tmp;
		buf1++;
		buf2++;
	}
}

void bubble_sort(void*base, int sz, int width, int(*cmp)(void*e1, void*e2))
{
	int i = 0;
	//趟数
	for (i = 0; i < sz - 1; i++)
	{
		//每一趟比较的对数
		int j = 0;
		for (j = 0; j < sz - 1 - i; j++)
		{
			//两个元素的比较
			if (cmp((char*)base + j*width, (char*)base + (j + 1)*width) > 0)
			{
				//交换
				Swap((char*)base + j*width, (char*)base + (j + 1)*width, width);
			}
		}
	}
}

void test5()
{
	struct Stu s[3] = { { "zhangsan", 20 }, { "lisi", 30 }, { "wangwu", 10 } };
	int sz = sizeof(s) / sizeof(s[0]);
	//bubble_sort(s, sz, sizeof(s[0]), cmp_stu_by_age);
	bubble_sort(s, sz, sizeof(s[0]), cmp_stu_by_name);
}

int main()
{
	test5();
	return 0;
}
````

