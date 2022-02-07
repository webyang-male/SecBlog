---
title: C基础之函数
tags: C
categories:
  - - 后端
    - C
description: C基础函数笔记
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 35609
date: 2021-03-01 15:00:47
---

### 大纲:

**本章主要掌握函数的基本使用和递归**

1. 函数是什么
2. 库函数
3. 自定义函数
4. 函数参数
5. 函数调用
6. 函数的嵌套调用和链式访问
7. 函数的声明和定义
8. 函数递归

------

### 函数定义

> 维基百科中对函数的定义：子程序
> 			  在计算机科学中，子程序（英语：Subroutine, procedure, function, routine, method, subprogram, callable unit），是一个大型程序中的某部分代码，  由一个或多个语句块组 成。它负责完成某项特定任务，而且相较于其他代  码，具备相对的独立性。
> 一般会有输入参数并有返回值，提供对过程的封装和细节的隐藏。这些代码通常被集成为软 件库。

**C语言中函数的分类：**

1. 库函数
2. 自定义函数

#### 库函数

##### 为什么会有库函数？

1. 我们知道在我们学习C语言编程的时候，总是在一个代码编写完成之后迫不及待的想知道结果，想 把这个结果打印到我们的屏幕上看看。这个时候我们会频繁的使用一个功能：将信息按照一定的格 式打印到屏幕上（printf）。

2. 在编程的过程中我们会频繁的做一些字符串的拷贝工作（strcpy）。

3. 在编程是我们也计算，总是会计算n的k次方这样的运算（pow）。
    像上面我们描述的基础功能，它们不是业务性的代码。我们在开发的过程中每个程序员都可能用的到， 为了支持可移植性和提高程序的效率，所以C语言的基础库中提供了一系列类似的库函数，方便程序员 进行软件开发。

  

  🌏学习网站:

  www.cplusplus.com

  https://zh.cppreference.com/

##### 常用的库函数

- IO函数
- 字符串操作函数 
- 字符操作函数 
- 内存操作函数 
- 时间/日期函数 
- 数学函数 
- 其他库函数

库函数代码例:

`strpy`

```c
//声明
char *strcpy(char *dest, const char *src)
```

**参数**

- **dest** -- 指向用于存储复制内容的目标数组。
- **src** -- 要复制的字符串。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	char arr1[] = "hello";
	char arr2[20] = "#########";
	strcpy(arr2,arr1);
	printf("%s\n",arr2);//输出--hello,原数组的\0也会被拷入新数组
	return 0;
}
```

`memset()`

```c
//声明
void *memset(void *str, int c, size_t n)
```

**参数**

- **str** -- 指向要填充的内存块。
- **c** -- 要被设置的值。该值以 int 形式传递，但是函数在填充内存块时是使用该值的无符号字符形式。
- **n** -- 要被设置为该值的字符数。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	char arr[] = "hello learner";
	memset(arr,'*',5);
	printf("%s\n",arr);//输出--***** learner
	return 0;
}
```

#### 自定义函数

<font style="color:gold;">如果库函数能干所有的事情，那还要程序员干什么？ 所以更加重要的是自定义函数。</font>

自定义函数和库函数一样，有函数名，返回值类型和函数参数。  但是不一样的是这些都是我们自己来设计。这给程序员一个很大的发挥空间。

**函数的组成：**

```c
ret_type fun_name(para1, * ) 
{
  statement;//语句项 
}
ret_type 返回类型 
fun_name 函数名 
para1    函数参数
```

**自定义函数例:**

找出两个整数中的最大值函数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int get_max(int x,int y){
	return (x>y)?(x):(y);
}

int main() {
	int num1 = 10;
	int num2 = 20;
	int max = get_max(num1,num2);
	printf("max = %d\n",max);
	return 0;
}
```

可以交换两个整形变量的函数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>
//非函数方法
int main() {
	int a = 10;
	int b = 20;
	int tmp = 0;
	printf("a=%d b=%d\n",a,b);

	tmp = a;
	a = b;
	b = tmp;
	printf("a=%d b=%d\n",a,b);
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>
//函数方法

//Swap1函数为原始的错误想法所写,不能实现数值交换,因为子函数不能直接操作主函数地址
//void代表空/无返回值的意思
void Swap1(int x,int y)
{
	int tmp = 0;
	tmp = x;
	x = y;
	y = tmp;
}

void Swap2(int* pa,int* pb)
{
	int tmp = 0;
	tmp = *pa;
	*pa = *pb;
	*pb = tmp;
}

int main() {
	int a = 10;
	int b = 20;
	//输出原始数值
	printf("a=%d b=%d\n",a,b);

	Swap2(&a,&b);
	//输出交换后数值
	printf("a=%d b=%d\n",a,b);
	return 0;
}

```

### 函数的参数

**实际参数（实参）：**
真实传给函数的参数，叫实参。实参可以是：常量、变量、表达式、函数等。无论实参是何种类 型的量，在进行函数调用时，它们都必须有确定的值，以便把这些值传送给形参。

**形式参数（形参）：**
形式参数是指函数名后括号中的变量，因为形式参数只有在函数被调用的过程中才实例化（分配 内存单元），所以叫形式参数。形式参数当函数调用完成之后就自动销毁了。因此形式参数只在 函数中有效。

<font style="color:skyblue;">上面Swap1和Swap2函数中的参数 x，y，px，py都是形式参数。在main函数中传给Swap1的num1， num2和传给Swap2函数的&num1，&num2是实际参数。</font>

### 函数的调用

#### 传值调用

函数的形参和实参分别占有不同内存块，对形参的修改不会影响实参。

#### 传址调用

传址调用是把函数外部创建变量的内存地址传递给函数参数的一种调用函数的方式。 这种传参方式可以让函数和函数外边的变量建立起正真的联系，也就是函数内部可以直接操 作函数外部的变量。

#### 练习

1.写函数打印100-200的素数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//是素数返回1,否则返回0
int is_prime(int n)
{
	//产生2到n-1的数试除
	int j = 0;
	for(j=2;j<n;j++)
	{
		if(n%j == 0)
			return 0;//相当于break,但是比break强,直接退出函数/程序,中止循环和后面代码执行
	}
	//代码能走到这里,说明for循环不满足,说明这个数是素数
	return 1;
}

int main() 
{
	int i = 0;
	for(i=100;i<=200;i++)
	{
		//判断i是否为素数
		if(is_prime(i) == 1)
		{
			printf("%d\n",i);
		}
	}

	return 0;
}
//前面练习有优化解法
```

2.每调用一次这个函数，就会将num的值增加1

```c
#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>
#include <string.h>

void Add(int* p)//当写下*p就代表下面的&num
{
	(*p)++;//但是这里{}里的*p需要加（）才能正确使用
}//++的优先级高于*的优先级，以防混淆加上（）

int main()
{
	int num = 0;
	Add(&num);
	printf("num=%d\n", num);//1
}
```

3.输出1000-2000年之间的闰年函数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int is_leap_year(int y){
	if((y%4 == 0 && y%100 != 0)|| (y%400 == 0)){
		return 1;
	}
	else{
		return 0;
	}
}

int main() 
{
	int year = 0;
	for(year=1000;year<=2000;year++)
	{
		//判断year是否为闰年
		if(1 == is_leap_year(year))
		{
			printf("%d ",year);
		}
	}

	return 0;
}

```

4.实现一个整形有序数组的二分查找函数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//本质arr是一个指针
int binary_search(int arr[],int k,int sz)
{
	//算法实现
	int left = 0;
	int right = sz-1;
	//left<=right说明数组中有元素可被查找
	while(left<=right){

		int mid = (left+right)/2;//中间元素下标

		if(arr[mid]<k)
		{
			left = mid+1;
		}
		else if(arr[mid]>k)
		{
			right = mid-1;
		}
		else
		{	//arr[mid]=k
			return mid;
		}
	}
	return -1;
}

int main() 
{
	//二分查找
	//在一个有序数组中查找具体的某个数
	//如果找到了,返回这个数下标,否则返回-1
	int arr[] = {1,2,3,4,5,6,7,8,9,10};
	int k = 7;
	int sz = sizeof(arr)/sizeof(arr[0]);//数组长度

	int ret = binary_search(arr,k,sz);

	if(ret == -1)
	{
		printf("找不到指定的数字\n");
	}
	else
	{
		printf("找到了,下标为:%d\n",ret);
	}
	return 0;
}
```

### 函数的嵌套调用和链式访问

函数和函数之间可以有机的组合的。

#### 嵌套调用

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

void new_line() {
	printf("你好鸭,C语言学习者!\n"); 
}

void three_line()
{
	int i = 0;
	for(i=0; i<3; i++)
	{
		new_line();
	}
}

int main() {
	three_line(); 
	return 0;
}
```

#### 链式访问

把一个函数的返回值作为另外一个函数的参数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() 
{	
	//写法1
	int len = 0;
	len = strlen("abc");
	printf("%d\n",len);
	//写法2
	printf("%d\n",strlen("abc"));
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() 
{	
	printf("%d",printf("%d",printf("%d",43)));//4321
	return 0;
}
//printf 返回值是大隐元素个数
```

### 函数的声明和定义

> 函数声明：
> 1. 告诉编译器有一个函数叫什么，参数是什么，返回类型是什么。但是具体是不是存在，无关 紧要。
>
> 2. 函数的声明一般出现在函数的使用之前。<font style="color:tomato;">要满足先声明后使用。</font>
>
> 3. 函数的声明一般要放在头文件中的。
>
>
>    函数定义：
>    函数的定义是指函数的具体实现，交待函数的功能实现。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() 
{	
	int a = 10;
	int b = 20;
	int sum = 0;
	sum = Add(a,b);
	printf("%d\n",sum);
	return 0;
}

//函数的定义
//会报错
int Add(int x,int y)
{
	int z = x+y;
	return z;
}
```

![c.png](https://s1.imagehub.cc/images/2021/04/04/c.png)

更改:

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//函数声明
int Add(int x,int y);

int main() 
{	
	int a = 10;
	int b = 20;
	int sum = 0;
	sum = Add(a,b);
	printf("%d\n",sum);
	return 0;
}

//函数的定义
//会报错
int Add(int x,int y)
{
	int z = x+y;
	return z;
}
```

✏️虽然更改后的代码这样写是对的,但是把上面代码中的函数定义放在主函数之前,函数声明就没用了(也不会错,就是以前的写法)

​	 而在实际工作中,函数的定义和声明不是上述用法

<font style="color:orange;">实际开发工程用法举例:</font>

主函数/程序c文件`c0304.c`

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

#include "add.h"//引用自定义头文件用双引号
int main() 
{	
	int a = 10;
	int b = 20;
	int sum = 0;
	sum = Add(a,b);
	printf("%d\n",sum);
	return 0;
}
```

自定义头文件`add.h`

```c
#define _CRT_SECURE_NO_WARNINGS 

//函数声明
int Add(int x,int y);
```

自定义函数实现c文件`Add.c`

```c
#define _CRT_SECURE_NO_WARNINGS

//函数的定义
int Add(int x,int y)
{
	int z = x+y;
	return z;
}
```

![c14214f245f961517.png](https://s1.imagehub.cc/images/2021/04/04/c14214f245f961517.png)

🌿大工程项目为了避免重复引用多个头文件,一般这样定义

```c
//test.h的内容  放置函数的声明

#ifndef __TEST_H__ 
#define __TEST_H__
//函数的声明
int Add(int x, int y); #endif //__TEST_H__
```

### 函数递归

什么是递归？

> 程序调用自身的编程技巧称为递归（ recursion）。 递归做为一种算法在程序设计语言中广泛应 用。 一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复 杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可 描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。 
>
> <font style="color:deepskyblue;">递归的主要思考方式在于：把大事化小</font>

简单递归代码例1:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main() 
{	
	printf("完成");//死循环打印完成,最后会出现Stack overflow--栈溢出的错误
	main();
	return 0;
}
```

#### 递归的两个必要条件

- 存在限制条件，当满足这个限制条件的时候，递归便不再继续。 
- 每次递归调用之后越来越接近这个限制条件。

#### 练习

练习1：
				接受一个整型值（无符号），按照顺序打印它的每一位。  例如：  输入：1234，输出 1 2 3 4.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void print(int n)
{
	if(n>9)
	{
		print(n/10);
	}
	printf("%d ",n%10);
}

int main() 
{	
	unsigned int num = 0;
	scanf("%d",&num);//1234
	//递归算法
  //123 4
  //12 3 4
  //1 2 3 4
	print(num);
	return 0;
}

```

练习2：
				编写函数不允许创建临时变量，求字符串的长度。

<font style="color:tomato;">用变量</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int my_strlen(char* str)
{	
	int count = 0;
	while(*str != '\0')
	{
		count++;
		str++;
	}
	return count;
}

int main() 
{	
	char arr[] = "abc";

	int len = my_strlen(arr);//arr是数组,数组传参,传过去的不是整个数组,而是第一个元素的地址
	printf("len = %d\n",len);
	return 0;
}
```

<font style="color:yellowgreen;">不用变量</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//递归方法
//把大事化小
//my_strlen("abc")=>1+my_strlen("bc")
//1+1+my_strlen("c")
//1+1+1+my_strlen("")
//1+1+1+0
//3
int my_strlen(char* str)
{	
	if(*str == '\0') 
		return 0;
	else 
		return 1+my_strlen(str+1);//这里的my_strlen(str+1)相当于从数组字母b地址开始找
}

int main() 
{	
	char arr[] = "abc";

	int len = my_strlen(arr);//arr是数组,数组传参,传过去的不是整个数组,而是第一个元素的地址
	printf("len = %d\n",len);
	return 0;
}
```

#### 递归与迭代 

练习3：
			求n的阶乘。（不考虑溢出）

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//int Facl(int n)
//{
//	int i = 0;
//	int ret = 1;
//	for(i=1;i<=n;i++)
//	{
//		ret *= i;
//	}
//	return ret;
//}

int Fac2(int n)
{
	if(n<=1)
	{
		return 1;
	}
	else
		return n*Fac2(n-1);
}

int main() 
{	
	//求n的阶乘
	int n = 0;
	int ret = 0;
	printf("请输入一个正整数:>\n");
	scanf("%d",&n);
	//ret = Facl(n);//循环的方式
	ret = Fac2(n);
	printf("%d\n",ret);
	return 0;
}
```

练习4：
			求第n个斐波那契数。（不考虑溢出）

> 斐波那契数列：
>
> <img src="https://bkimg.cdn.bcebos.com/formula/fbb0b7c865c14339999bf5f7bd931c28.svg" alt="百度百科" style="zoom:150%;" />

<font style="color:pink;">规律:这个数列从第3项开始，每一项都等于前两项之和。</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int count = 0;
int Fib(int n)
{
	if(n==3)//测试第3个斐波那契数的计算次数,非此题所需代码
	{
		count++;
	}
	if(n<=2)
		return 1;
	else
		return Fib(n-1)+Fib(n-2);
}
int main() 
{	
	int n = 0;
	int ret = 0;
	printf("请输入一个自然数:>\n");
	scanf("%d",&n);
	//TDD - 测试驱动开发
	ret = Fib(n);
	printf("ret = %d\n",ret);
	printf("count = %d次\n ",count);
	return 0;
}
```

<font style="color:tomato;">但是我们发现有问题:</font>
					在使用 `Fib`这个函数的时候如果我们要计算第50个斐波那契数字的时候特别耗费时间。 使用 `Fib`函数求10000的阶乘（不考虑结果的正确性），程序会崩溃。我们看看输出的count，是一个很大很大的值。

<font style="color:orange;">为什么呢？</font>
我们发现`Fib`函数在调用的过程中很多计算其实在一直重复。 

 如果我们把代码修改一下：

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int Fib(int n)
{
	int a = 1;
	int b = 1;
	int c = 1;

	while(n>2)
	{
		c = a+b;
		a = b;
		b = c;
		n--;//避免重复计算
	}
	return c;
}

int main() 
{	
	int n = 0;
	int ret = 0;
	printf("请输入一个自然数:>\n");
	scanf("%d",&n);
	//TDD - 测试驱动开发
	ret = Fib(n);
	printf("ret = %d\n",ret);//数值过大,可能会出现int空间不足---数值溢出
	return 0;
}
```

✍
1. 许多问题是以递归的形式进行解释的，这只是因为它比非递归的形式更为清晰。
2. 但是这些问题的迭代实现往往比递归实现效率更高，虽然代码的可读性稍微差些。
3. 当一个问题相当复杂，难以用迭代实现时，此时递归实现的简洁性便可以补偿它所带来的运行时开 销。

------

函数递归经典题目：
1. 汉诺塔问题
2. 青蛙跳台阶问题