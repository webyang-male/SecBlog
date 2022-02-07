---
title: C数据的存储
tags: C
categories:
  - - 后端
    - C
description: "\U0001F33EC进阶学习笔记--数据的存储"
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 35589
date: 2021-04-17 16:54:59
---

### 大纲

1. 数据类型详细介绍
2. 整形在内存中的存储：原码、反码、补码
3. 大小端字节序介绍及判断
4. 浮点型在内存中的存储解析

### 数据类型介绍

```c
//内置类型

char //字符数据类型
short //短整型
int //整形
long //长整型
long long //更长的整形
float //单精度浮点数
double //双精度浮点数
```

<font style="color:skyblue;">C语言数据类型分为内置类型和自定义类型(构造类型)</font>

**类型的意义：**

​	1.类型开辟内存空间的大小（大小决定了使用范围）。

​	2.决定看待内存空间的视角

**代码实例及图解**

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 10;
	float b = 10.0;
	
	return 0;
}
````

[![int-c.png](https://s1.imagehub.cc/images/2021/04/17/int-c.png)](https://www.imagehub.cc/image/MltCm)[![float-c.png](https://s1.imagehub.cc/images/2021/04/17/float-c.png)](https://www.imagehub.cc/image/Ml8rN)

从图例结果可以看到,定义的数值大小一致,但由于数据类型不同,其对应的在内存中存储的值不一样

### 类型的基本归类：

#### 整形家族：

```c
char
unsigned char
signed char
  
short
unsigned short [int]
signed short [int]
  
int
unsigned int
signed int
  
long
unsigned long [int]
signed long [int]
```

#### 浮点数家族：

```c
float
double
```

#### 构造类型：

```c
数组类型
结构体类型 struct
枚举类型 enum
联合类型 union
```

#### 指针类型

```c
int *pi;
char *pc;
float* pf;
void* pv;
```

#### 空类型：

> void 表示空类型（无类型）
> 通常应用于函数的返回类型、函数的参数、指针类型。

### 整形在内存中的存储

一个变量的创建是要在内存中开辟空间的。空间的大小是根据不同的类型而决定的。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 10;
	int b = -20;
	return 0;
}
```

我们知道int类型为`a `分配四个字节的空间。

那如何存储？接下来了解下面的概念：

#### 原码、反码、补码

计算机中的有符号数有三种表示方法，即原码、反码和补码。

三种表示方法均有<font style="color:pink;font-size:18px;">符号位和数值位</font>两部分，符号位都是用0表示“正”，用1表示“负”，而数值位三种表示方法各不相同。

> **原码**
> 直接将二进制按照正负数的形式翻译成二进制就可以。

> **反码**
> 将原码的符号位不变，其他位依次按位取反就可以得到了。

> **补码**
> 反码+1就得到补码。

<font style="color:deepskyblue;">正数的原、反、补码都相同。</font>

✏️对于整形来说：数据存放内存中其实存放的是补码。

> 在计算机系统中，数值一律用补码来表示和存储。原因在于，使用补码，可以将符号位和数值域统一处理； 同时，加法和减法也可以统一处理（CPU只有加法器）此外，补码与原码相互转换，其运算过程是相同的，不需要额外的硬件电路。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//00000000 00000000 00000000 00010100 - 原码
	//00000000 00000000 00000000 00010100 - 反码
	//00000000 00000000 00000000 00010100 - 补码
	int a = 20;//4个字节-32bit
	//10000000 00000000 00000000 00001010 - 原码
	//11111111 11111111 11111111 11110101 - 反码
	//1111 1111 1111 1111 1111 1111 1111 0110 - 补码
	//四位二进制可以转换为16进制数
	//变量b的补码转换成16进制数为:
	//FFFFFFF6
	//转换成地址:0xFFFFFFF6
	int b = -10;
	
	return 0;
}
```

**图例A:**

![c.png](https://s1.imagehub.cc/images/2021/04/17/c.png)

✍**小结:**

![-2021-04-17-200636.png](https://s1.imagehub.cc/images/2021/04/17/-2021-04-17-200636.png)

我们可以看到对于a和b分别存储的是补码。但是我们发现顺序有点不对劲。 为什么？

#### 大小端介绍

> 大端（存储）模式，是指数据的低位保存在内存的高地址中，而数据的高位，保存在内存的低地址中；
>
> 小端（存储）模式，是指数据的低位保存在内存的低地址中，而数据的高位,，保存在内存的高地址中。

[为什么存在 大端 模式 小端](https://zhuanlan.zhihu.com/p/360037797)

> 为什么会有大小端模式之分呢？
>
> 这是因为在计算机系统中，我们是以字节为单位的，每个地址单元都对应着一个字节，一个字节为8bit。但是在C语言中除了8bit的char之外，还有16bit的short型，32bit的long型（要看具体的编译器），另外，对于位数大于8位的处理器，例如16位或者32位的处理器，由于寄存器宽度大于一个字节，那么必然存在着一个如何将多个字节安排的问题。因此就导致了大端存储模式和小端存储模式。
>
> 例如一个16bit 的short 型x ，在内存中的地址为0x0010 ， x 的值为0x1122 ，那么0x11 为高字节， 0x22为低字节。对于大端模式，就将0x11 放在低地址中，即0x0010 中， 0x22 放在高地址中，即0x0011 中。小端模式，刚好相反。我们常用的X86 结构是小端模式，而KEIL C51 则为大端模式。很多的ARM，DSP都为小端模式。有些ARM处理器还可以由硬件来选择是大端模式还是小端模式。

##### 习题

设计一个小程序来判断当前机器的字节序

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

check_sys()
{
	int a = 1;

	//char* p = (char*)&a;
	////*p返回1,小端 返回0,大端
	//return *p;
	return *(char*)&a;
}

int main()
{
	//返回1,小端 返回0,大端
	int ret = check_sys();	
	if (ret == 1)
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

### 浮点型在内存中的存储

**常见的浮点数：**
		`3.14159 1E10 `

> 浮点数家族包括： float、double、long double 类型。 
>
> 浮点数表示的范围：`float.h`中定义

浮点数存储代码例：

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int n = 9;
	float *pFloat = (float *)&n;
	printf("n的值为：%d\n", n);//9
	printf("*pFloat的值为：%f\n", *pFloat);//0.000000
	*pFloat = 9.0;
	printf("num的值为：%d\n", n);//1091567616
	printf("*pFloat的值为：%f\n", *pFloat);//9.000000
	return 0;
}
```

num 和*pFloat 在内存中明明是同一个数，为什么浮点数和整数的解读结果会差别这么大？ 

📖详细解读：

> 根据国际标准IEEE（电气和电子工程协会） 754，任意一个二进制浮点数V可以表示成下面的形式：
>
> - ​		        (-1)^S * M * 2^E
> - ​				(-1)^s表示符号位，当s=0，V为正数；当s=1，V为负数。
> - ​				M表示有效数字，大于等于1，小于2。
> - ​				2^E表示指数位。

举个🌰：

 十进制的5.0，写成二进制是101.0 ，相当于1.01×2^2 。 那么，按照上面V的格式，可以得出s=0，M=1.01，E=2。
	    十进制的-5.0，写成二进制是-101.0 ，相当于-1.01×2^2 。那么，s=1，M=1.01，E=2。

<font style="color:deepskyblue;font-size:17px;">IEEE 754规定： </font>

​		对于32位的浮点数，最高的1位是符号位s，接着的8位是指数E，剩下的23位为有效数字M。

![IEEE-754-32.png](https://s1.imagehub.cc/images/2021/04/19/IEEE-754-32.png)

​		对于64位的浮点数，最高的1位是符号位S，接着的11位是指数E，剩下的52位为有效数字M。

![IEEE-754-64.png](https://s1.imagehub.cc/images/2021/04/19/IEEE-754-64.png)

​		<font style="color:orange;">IEEE 754对有效数字M和指数E，还有一些特别规定。</font> 前面说过， 1≤M<2 ，也就是说，M可以写成1.xxxxxx 的形式，其中xxxxxx表示小数部分。

​	   IEEE 754规定，在计算机内部保存M时，默认这个数的第一位总是1，因此可以被舍去，只保存后面的xxxxxx部分。比如保存1.01的时候，只保存01，等到读取的时候，再把第一位的1加上去。这样做的目的，是节省1位有效数字。以32位浮点数为例，留给M只有23位，将第一位的1舍去以后，等于可以保存24位有效数字。

​	 <font style="color:orange;">至于指数E，情况就比较复杂。</font>
​			<font style="color:pink;">首先，E为一个无符号整数（unsigned int）</font> 这意味着，如果E为8位，它的取值范围为`0-255`；如果E为11位，它的取值范围为`0-2047`。但是，我们知道，科学计数法中的E是可以出现负数的，所以IEEE 754规定，存入内存时E的真实值必须再加上一个中间数， <font style="color:yellowgreen;">对于8位的E，这个中间数是127；对于11位的E，这个中间数是1023。</font>比如，2^10的E是10，所以保存成32位浮点数时，必须保存成10+127=137，即10001001。

####  <font style="color:deepskyblue;">浮点型数据在内存存放代码例:</font>

##### 例F1

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	float f = 5.5;
	//十进制5.5转换成二进制数-->101.1
	//转换成浮点数计数法-->(-1)^0 * 1.011*2^2
	//S=0 M=1.011 E =2
	/*
	按照IEEE 754规则:
	最高位符号位为0
	E实际值为2,8个bit位=>2+127=>129
	129的二进制序列为=>10000001
	紧接着存放小数位=>011,但规定float有23个bit位
	则小数位转换成二进制序列为:
	011 0000 0000 0000 0000 0000
	所以浮点数5.5的完整二级制序列为
	0(符号位)+ 10000001 + 011 0000 0000 0000 0000 0000,即
	0100 0000 1011 0000 0000 0000 0000 0000
	转换成16进制数=>
	0100 = 4 
	0000 = 0
	1011 = 11 = B
	...
	最终浮点数5.5的16进制数为=>0x40b00000
	*/
	return 0;
}
```

![c.png](https://s1.imagehub.cc/images/2021/04/19/c.png)

####  <font style="color:orange;">指数E从内存中取出可分成三种情况：</font>

##### 		E不全为0或不全为1

> 这时，浮点数就采用下面的规则表示，即指数E的计算值减去127（或1023），得到真实值，再将有效数字M前加上第一位的1。 比如： 0.5（1/2）的二进制形式为0.1，由于规定正数部分必须为1，即将小数点右移1位，则为1.0*2^(-1)，其阶码为-1+127=126，表示为01111110，而尾数1.0去掉整数部分为0，补齐0到23位00000000000000000000000，则其二进制表示形式为:

```c
0 01111110 00000000000000000000000
```

##### 		E全为0

> 这时，浮点数的指数E等于1-127（或者1-1023）即为真实值， 有效数字M不再加上第一位的1，而是还原为0.xxxxxx的小数。这样做是为了表示±0，以及接近于0的很小的数字

```c
//假设内存中存储这样一个二进制数
0 00000000 01100000000000000000000
//则按照全0规则转换为
+/-   0.011 * 2^-126
```

##### E全为1

> 这时，如果有效数字M全为0，表示±无穷大（正负取决于符号位s）

````c
//假设当前二进制序列值为
0 11111111 0110000 0000 0000 0000 0000
11111111 = 255 = E + 127 = >E = 128
//如果转化成计数法将是如下情形(数值将正负无穷大)
+/- 1.XXX * 2 ^ 128
````

#### ✈️例F1解析

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	/*
	整型9的原反补码:
	00000000 00000000 00000000 00001001
	*/
	int n = 9;
	/*
		*pFloat
		S=>0=>正数
		E=>00000000=>全0情况
		(-1)^0 * 0.0000000 00000000 00000000 00001001 * 2^-126
		综上所述:该数值表示正无限趋近于0
	*/
	float *pFloat = (float *)&n;
	printf("n的值为：%d\n", n);//9
	printf("*pFloat的值为：%f\n", *pFloat);//0.000000

	*pFloat = 9.0;
	/*
		1001.0
		1.001*2^3
		(-1)^0 * 1.001 * 2^3
		0(正数) + 3+127=130 + 001 0000 0000 0000 0000 0000
		即:
		0 10000010 001 0000 0000 0000 0000 0000
		01000001000100000000000000000000
	*/
	printf("num的值为：%d\n", n);//1091567616
	printf("*pFloat的值为：%f\n", *pFloat);//9.000000
	return 0;
}
```



### ⚡习题

下面这些代码例输出结果是什么?

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//变量a的原反补码:
	//10000000 00000000 00000000 00000001
	//11111111 11111111 11111111 11111110
	//11111111 11111111 11111111 11111111
	//a一个字节只能存8个bit位->11111111
	//a是有符号位char,则最高位为符号位进行整型提升,补码结果:
	//11111111 11111111 11111111 11111111
	//转换成原码还是10000000 00000000 00000000 00000001,所以打印-1
	char a = -1;
	//变量b的补码:11111111
	signed char b = -1;
	//变量c的补码:11111111
	//无符号字符变量c,整型提升高位补0,则32位完整补码为:00000000 00000000 00000000 11111111
	//最高位是0,为正数,则原反补相同
	//11111111装换成十进制就是255
	unsigned char c = -1;
	printf(" a=%d\n b=%d\n c=%d\n", a, b, c);
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//10000000 00000000 00000000 10000000
	//11111111 11111111 11111111 01111111
	//11111111 11111111 11111111 10000000 -补码
	//10000000
	//整型提升结果:
	//11111111 11111111 11111111 10000000 -补码

	char a = -128;
	//%d - 打印十进制的有符号数字
	//%u - 打印十进制的无符号数字 - 则原反补相同
	printf("%u\n", a);//输出补码转换后的十进制结果 - 4294967168
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <Windows.h>//Sleep休眠函数头文件
int main()
{
	//无符号数没有符号位(0/1)
	unsigned int i;//-1在无符号数定义下被认为是一个超大二进制数(最终转为十进制数输出)
	for (i = 9; i >= 0; i--)
	{
		printf("%u\n", i);
		Sleep(1500);//毫秒单位
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
	//char的取值范围为 - 128~127
	char a[1000];//下标0-999
	int i;
	for (i = 0; i<1000; i++)
	{
		a[i] = -1 - i;
	}
	printf("%d\n", strlen(a));//打印\0之前的长度
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

unsigned char i = 0;//0-255
int main()
{
	//i <= 255恒成立
	for (i = 0; i <= 255; i++)
	{
		printf("hello world\n");
	}
	return 0;
}
```

### 😂清醒一下

<iframe height="691" src="https://www.yunyoujun.cn/air-conditioner/"></iframe>

