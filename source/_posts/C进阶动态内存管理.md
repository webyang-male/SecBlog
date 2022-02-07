---
title: C进阶动态内存管理-1
tags: C
categories:
  - - 后端
    - C
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 45393
date: 2021-06-22 17:53:09
---

### 本章大纲

- 动态内存分配意义
- 动态内存函数的介绍
  		  malloc
  
    free
    calloc
    realloc
- 常见的动态内存错误
- 经典的笔试题
- 柔性数组

------

### 动态内存分配意义

我们熟知的内存开辟方式有：

```c
int temp = 20;//在栈空间上开辟四个字节--局部变量
int temp_glob = 1;//静态区--全局变量
char arr[10] = {0};//在栈空间上开辟10个字节的连续空间
```

上述的开辟空间的方式有两个特点：
1. 空间开辟大小是固定的。
2. 数组在申明的时候，必须指定数组的长度，它所需要的内存在编译时分配。
但是对于空间的需求，不仅仅是上述的情况。有时候我们需要的空间大小在程序运行的时候才能知道，那数组的编译时开辟空间的方式就不能满足了。 这时候就只能试试动态存开辟了。

⚠️<font style="color:orange;">C语言是可以创建变长数组 ——– C99标准</font>

````c
#include <string.h>
#include <stdio.h>
//变长数组 
int main()
{
	int n = 0;
	scanf("%d",&n);
	int arr[n];
	int i = 0;

	for ( i = 0; i < n; i++)
	{
		arr[i] = i;
	}
	for ( i = 0; i < n; i++)
	{
		printf("%d ",arr[i]);
	}
	return 0;
}
````

<font style="color:#3eaf7c;">Linux回家 gcc编译可通过</font>

### 动态内存函数的介绍

#### malloc和free

C语言提供了一个动态内存开辟的函数：

```c
void* malloc (size_t size);
```

这个函数向内存申请一块连续可用的空间，并返回指向这块空间的指针。

- 如果开辟成功，则返回一个指向开辟好空间的指针。
- 如果开辟失败，则返回一个NULL指针，因此`malloc`的<font style="color:tomato;">返回值一定要做检查</font>。
- 返回值的类型是`void* `，所以malloc函数并不知道开辟空间的类型，具体在使用的时候使用者自己来决定。
- 如果参数size 为0，malloc的行为是标准是未定义的，取决于编译器。

````c
#define _CRT_SECURE_NO_WARNINGS
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

int main()
{
	//向内存申请10个整型的空间
	int*p = (int*)malloc(10 * sizeof(int));
	//int *p = (int*)malloc(INT_MAX);//失败测试
	if (p == NULL)
	{
		//打印错误原因
		printf("%s\n",strerror(errno));
	}
	else
	{
		//正常使用空间
		int i = 0;
		for ( i = 0; i < 10; i++)
		{
			*(p + i) = i;
		}
		for (i = 0; i < 10; i++)
		{
			printf("%d ", *(p + i));
		}
	}
  //当动态申请的空间不需要时,用free函数释放归还空间给操作系统
	free(p);//和malloc函数成对使用
  p=NULL;
	return 0;
}
````

#### calloc

C语言还提供了一个函数叫calloc ， calloc 函数也用来动态内存分配

```c
void* calloc (size_t num, size_t size);
```

- 函数的功能是为`num` 个大小为`size `的元素开辟一块空间，并且把空间的每个字节初始化为0。
- 与函数 `malloc` 的区别只在于`calloc` 会在返回地址之前把申请的空间的每个字节初始化为全0。

```c
int main()
{
	int *p = (int*)calloc(10, sizeof(int));
	if (p == NULL)
	{
		//打印错误原因
		printf("%s\n", strerror(errno));
	}
	else
	{
		//正常使用空间
		int i = 0;
		
		for (i = 0; i < 10; i++)
		{
			printf("%d ", *(p + i));//10个0
		}
	}
	//free函数释放动态开辟的空间
	free(p);
	p = NULL;
	return 0;
}
```

#### realloc

> - realloc函数的出现让动态内存管理更加灵活。
> - 有时会我们发现过去申请的空间太小了，有时候我们又会觉得申请的空间过大了，那为了合理的使用内存，我们一定会对内存的大小做灵活的调整。那realloc 函数就可以做到对动态开辟内存大小的调整。

```c
void* realloc (void* ptr, size_t size);
```

- ptr 是要调整的内存地址
- size 调整之后新大小
- 返回值为调整之后的内存起始位置。
- 这个函数调整原内存空间大小的基础上，还会将原来内存中的数据移动到 新 的空间。

##### <font style="color:deepskyblue;">realloc在调整内存空间的是存在两种情况：</font>

情况1：原有空间之后有足够大的空间

情况2：原有空间之后没有足够大的空间

```c
int main()
{
	int *p = (int*)malloc(20);
	if (p == NULL)
	{
		printf("%s\n", strerror(errno));
	}
	else
	{
		int i = 0;
		for (i = 0; i < 5; i++)
		{
			*(p + i) = i;
		}
	}
	//就是在使用malloc开辟的20个字节空间
	//假设这里，20个自字节不能满足我们的使用了
	//希望我们能够有40个字节的空间
	//这里就可以使用realloc来调整动态开辟的内存

	//realloc使用的注意事项：
	//1. 如果p指向的空间之后有足够的内存空间可以追加，则直接追加，后返回p
	//2. 如果p指向的空间之后没有足够的内存空间可以追加，则realloc函数会重新找一个新的内存区域
	//  开辟一块满足需求的空间，并且把原来内存中的数据拷贝回来，释放旧的内存空间
	//  最后返回新开辟的内存空间地址
	//3. 得用一个新的变量来接受realloc函数的返回值
	//
	int*ptr = realloc(p, INT_MAX);

	if (ptr != NULL)
	{
		p = ptr;
		int i = 0;
		for (i = 5; i < 10; i++)
		{
			*(p + i) = i;
		}

		for (i = 0; i < 10; i++)
		{
			printf("%d ", *(p + i));
		}
	}

	//释放内存
	free(p);
	p = NULL;

	return 0;
}
```

##### 情况1 

当是情况1 的时候，要扩展内存就直接原有内存之后直接追加空间，原来空间的数据不发生变化。 

##### 情况2 

当是情况2 的时候，原有空间之后没有足够多的空间时，扩展的方法是：在堆空间上另找一个合适大小的连续空间来使用。这样函数返回的是一个新的内存地址。 由于上述的两种情况，realloc函数的使用就要注意一些。

##### 拓展

`realloc`函数实现malloc函数功能

```c
int main()
{
	//int *p = (int*)malloc(40);
	//if (p == NULL)
	//{
	//	return 0;
	//}
	////正常使用
	//int *p2 = realloc(p, 80);
	//if (p2 != NULL)
	//{
	//	p = p2;
	//}
	//

	int *p = realloc(NULL, 40);//等同于malloc(40)
	return 0;
}
```



#### ⚠️<font style="color:tomato;">常见的动态内存错误</font>

##### 对NULL指针的解引用操作

````c
int main()
{
	int *p = (int *)malloc(40);
	//一旦malloc失败,p将被赋值为NULL
	//*p= 0;

	int i = 0;
	for ( i = 0; i < 10; i++)
	{
		*(p+i) = i;
	}
	free(p);
	p = NULL;
	return 0;
}
````

##### 对动态开辟空间的越界访问

````c
int main()
{
  int *p = (int*)malloc(5 * sizeof(int));

	int i = 0;
	for (i = 0; i < 10; i++)
	{
		*(p + i) = i;
	}
	free(p);
	p = NULL;
}
````

##### 对非动态开辟内存使用free释放

```c
int main()
{
 int a = 10;
 int *p = &a;
 free(p);
}
```

##### 使用free释放一块动态开辟内存的一部分

```c
int main()
{
		int *p = (int *)malloc(100);
		p++;
		free(p);//p不再指向动态内存的起始位置
}
```

##### 对同一块动态内存多次释放

```c
int main()
{
int *p = (int *)malloc(100);
free(p);
free(p);//重复释放
}
```

<font style="color:yellowgreen;">正确做法</font>

````c
int main()
{
	int *p = (int *)malloc(100);
	free(p);
 	p=NULL;
	free(p);
}
````

##### 动态开辟内存忘记释放（内存泄漏）

````c
void test()
{
	int *p = (int *)malloc(100);
	if (NULL != p)
	{
		*p = 20;
	}
}

int main()
{
	test();
	while (1);
}
````

<font style="color:darkorange;">忘记释放不再使用的动态开辟的空间会造成内存泄漏。 动态开辟的空间一定要释放，并且正确释放。</font>

### 经典笔试题

##### 题目1：

````c
void GetMemory(char *p)
{
	p = (char *)malloc(100);
}

void Test(void)
{
	char *str = NULL;
	GetMemory(str);
	strcpy(str, "hello world");
	printf(str);
}

int main()
{
	Test();
	return 0;
}
````

**改正**

```c
//1.运行代码程序会出现崩溃的现象
//2.程序存在内存泄漏的问题
//str以值传递的形式给p
//p是GetMemory函数的形参，只能函数内部有效等GetMemory函数返回之后，动态开辟内存尚未释放并且无法找到，所以会造成内存泄漏

//改正1
void GetMemory(char **p)
{
	*p = (char *)malloc(100);
}

void Test(void)
{
	char *str = NULL;
	GetMemory(&str);
	strcpy(str, "hello world");
	printf(str);

	free(str);
	str = NULL;
}

int main()
{
	Test();
	return 0;
}

//改正2
char* GetMemory(char *p)
{
	p = (char *)malloc(100);
	return p;
}

void Test(void)
{
	char *str = NULL;
	str = GetMemory(str);
	strcpy(str, "hello world");
	printf(str);
	free(str);
	str = NULL;
}

int main()
{
	Test();
	return 0;
}
```

<font style="color:pink;">累了，C进阶动态内存管理学习今天就先到这儿 ba !</font>

