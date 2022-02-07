---
title: C基础操作符
tags: C
categories:
  - - 后端
    - C
description: C基础操作符学习笔记
abbrlink: 15093
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
date: 2021-03-20 09:55:24
---

### 大纲

1. 各种操作符的介绍。
2. 表达式求值

------

### 操作符

> 分类：
> 算术操作符
> 移位操作符
> 位操作符
> 赋值操作符
> 单目操作符
> 关系操作符
> 逻辑操作符
> 条件操作符
> 逗号表达式
> 下标引用、函数调用和结构成员

#### 算术操作符

```matlab
+ - * / %
```

1. 除了% 操作符之外，其他的几个操作符可以作用于整数和浮点数。
2. 对于/ 操作符如果两个操作数都为整数，执行整数除法。而只要有浮点数执行的就是浮点数除
法。
3. % 操作符的两个操作数<font style="color:pink;">必须为整数</font>。返回的是整除之后的余数。

**代码例**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 5 / 2;//求商-商2余1,这里是整型
	int b = 5 % 2;//余1
	double c = 5 / 2.0;
	printf("a=%d\n",a);//a=2
	printf("b=%d\n", b);//b=1
	printf("c=%lf\n", c);//c=2.500000
	return 0;
}
```

#### 移位操作符

```matlab
<< 左移操作符
>> 右移操作符
```

> **左移操作符 移位规则：**
>        左边抛弃、右边补0

> **右移操作符 移位规则：**
> 	   首先右移运算分两种：
>
> 1. 逻辑移位 左边用0填充，右边丢弃
> 2. 算术移位 左边用原该值的符号位填充，右边丢弃

**代码例:**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = -1;
	int x = 16;
	//>>--右移操作符
	//移动的是二进制位
	
	int b = a >> 1;
	int y = x >> 1;
	printf("%d\n", b);//可以推断出此时采用的是算术移位
	printf("%d\n", y);//8=1*2^3
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//5的二进制原码:00000000 00000000 00000000 00000101
	int a = 5;
	int b = a << 1;
	//左移后:00000000 00000000 00000000 00001010
	printf("%d\n", b);//10

	return 0;
}
```

警告⚠️ ： <font style="color:tomato;">对于移位运算符，不要移动负数位，这个是标准未定义的。</font> 例如：

```c
int num = 10;
num>>-1;//error
```

📖<font style="color:deepskyblue;">移位操作符和位操作符只适用于整数操作,不能用于浮点数</font>

#### 位操作符

```c
& //按位与
| //按位或
^ //按位异或
```

✏️<font style="color:lightskyblue;">注：他们的操作数必须是整数。</font>

> ##### 按位与操作(&)
>
> **0&0=0; 0&1=0; 1&0=0; 1&1=1**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//&--按2进制位与
	int a = 3;//00000000 00000000 00000000 00000011
	int b = 5;//00000000 00000000 00000000 00000101
	int c = a&b;//00000000 00000000 00000000 00000001=>1
	printf("c=%d\n", c);//c=2

	return 0;
}
```

> ##### 按位或运算符（|）
>
> - 运算规则：0|0=0； 0|1=1； 1|0=1； 1|1=1；
>   - 即 ：参加运算的两个对象只要有一个为1，其值为1。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	// |--按2进制位或
	int a = 3;//00000000 00000000 00000000 00000011
	int b = 5;//00000000 00000000 00000000 00000101
	int c = a|b;//00000000 00000000 00000000 00000111
	printf("c=%d\n", c);//c=7

	return 0;
}
```

> ##### 异或运算符（^）
>
> - 运算规则：0^0=0； 0^1=1； 1^0=1； 1^1=0；
>   - 即：参加运算的两个对象，如果两个相应位为“异”（值不同），则该位结果为1，否则为0。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	// |--按2进制异或
	int a = 3;//00000000 00000000 00000000 00000011
	int b = 5;//00000000 00000000 00000000 00000101
	int c = a^b;//00000000 00000000 00000000 00000110
	printf("c=%d\n", c);//c=6

	return 0;
}
```

#### 面试题：

1.不能创建临时变量（第三个变量），实现两个数的交换。

[![22efcce09840134b4c4b87b7b9e381e0.md.png](https://s1.imagehub.cc/images/2021/04/13/22efcce09840134b4c4b87b7b9e381e0.md.png)](https://www.imagehub.cc/image/MgL5H)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法1--加减法
int main()
{
	int a = 5;
	int b = 3;
	a = a + b;
	b = a - b;
	a = a - b;
	printf("a=%d,b=%d\n", a,b);

	return 0;
}
```

方法1虽然看似得到结果,但是存在缺陷,例如:当变量a和变量b数值都非常大时,整型int空间将不足 ——— 可能会溢出

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法2
int main()
{
	//异或方法
	int a = 5;
	int b = 3;
	a = a ^ b;
	b = a ^ b;
	a = a ^ b;
	printf("a=%d,b=%d\n", a,b);

	return 0;
}
```

2.求一个整数存储在内存中的二进制中1的个数。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法1
int main()
{
	int num = 0;
	int count = 0;
	printf("请输入一个整数:>\n");
	scanf("%d",&num);
	//统计num的补码中有几个1
	while (num)
	{
		if (num%2==1)
		{
			count++;
		}
		num = num / 2;
	}
	printf("count=%d\n",count);

	return 0;
}
```

方法1虽然看似得到结果,但是存在问题,假设输入值是`-1`,`-1`的二进制是32位全1,但是程序运行结果为0

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法2
//num&1 == 1 =>最低位一定为1
int main()
{
	int num = 0;//输入值初始化
	int count = 0;//计数初始化
	int i = 0;
	printf("请输入一个整数:>\n");
	scanf("%d", &num);
	for (i = 0; i < 32; i++)
	{
		if (1 == ((num >> i) & 1))
		{
			count++;
		}
	}
	printf("count=%d\n", count);

	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//方法3：
int main()
{
	int num = 0;
	int i = 0;
	int count = 0;//计数
	printf("请输入一个整数:>\n");
	scanf("%d", &num);
	while (num)
	{
		count++;
		num = num&(num - 1);
	}
	printf("二进制中1的个数 = %d\n", count);
	return 0;
}
```

#### 赋值操作符

赋值操作符是一个很棒的操作符，他可以让你得到一个你之前不满意的值。也就是你可以给自己重新赋值。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int weight = 120;//体重
	weight = 89;//不满意就赋值
	double salary = 10000.0;
	salary = 20000.0;//使用赋值操作符赋值。
	return 0;
}
```

##### 拓展:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main(){
	//赋值操作符可以连续使用，比如：
	int a = 10;
	int x = 0;
	int y = 20;
	a = x = y + 1;//连续赋值
	//这样的代码感觉怎么样？
	//那同样的语义，你看看：
	x = y + 1;
	a = x;
	//这样的写法是不是更加清晰爽朗而且易于调试。
	return 0;
}
```

#### 复合赋值符

```c
+=
-=
*=
/=
%=
>>=
<<=
&=
|=
^=
```

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main(){
	int a = 10;
	a = a + 2;
	a += 2;//复合赋值符

	int x = 8;
	x = x >> 1;
	x >>= 1;

	int m = 6;
	m = m & 1;
	m &= 1;
	//其他运算符一样的道理。只是这样写更加简洁。
	return 0;
}
```

#### 单目操作符

```c
!           逻辑反操作
-           负值
+           正值
&           取地址
sizeof      操作数的类型长度（以字节为单位）
~           对一个数的二进制按位取反
--          前置、后置--
++          前置、后置++
*           间接访问操作符(解引用操作符)
(类型)       强制类型转换
```

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main(){
	int a = 0;
	if (a)
	{
		printf("条件为假,看不见本句\n");
	}
	if (!a)
	{
		printf("条件为真,输出本句\n");
	}

	int b = -5;
	b = -b;
	printf("%d\n",b);

	int x = 10;
	int* p = &x;//&取地址操作符
	*p = 520;//*解引用操作符
	printf("%d\n", *p);//*p=x=520

	int q = 10;
	char c = 'c';
	char *d = &c;
	int arr[10] = {0};

	//sizeof计算变量所占内存空间的大小
	printf("%d\n", sizeof(q));//4
	printf("%d\n", sizeof(int));//4
	//printf("%d\n", sizeof int);//sizeof后接类型不能省略括号
	printf("%d\n", sizeof(c));//1
	printf("%d\n", sizeof(d));//4
	printf("%d\n", sizeof(arr));//40
	printf("%d\n", sizeof(int[10]));//数组类型--40
  
  int z = 0;
	//  ~ 按(二进制)位取反
	//00000000 00000000 00000000 00000000
	//11111111 11111111 11111111 11111111 - 补码
	//11111111 11111111 11111111 11111110 - 反码
	//10000000 00000000 00000000 00000001 - 原码
	printf("%d\n", ~z);//-1
	return 0;
}
```

```c
//++和--运算符

//前置++和--
#include <stdio.h>
int main()
{
int a = 10;
int x = ++a;
//先对a进行自增，然后对使用a，也就是表达式的值是a自增之后的值。x为11。
int y = --a;
//先对a进行自减，然后对使用a，也就是表达式的值是a自减之后的值。y为10;
return 0;
}


//后置++和--
#include <stdio.h>
int main()
{
int a = 10;
int x = a++;
//先对a先使用，再增加，这样x的值是10；之后a变成11；
int y = a--;
//先对a先使用，再自减，这样y的值是11；之后a变成10；
return 0;
}
```

##### 拓展

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	short s = 0;
	int a = 10;
	printf("%d\n", sizeof(s = a + 5));//2--short类型
	//sizeof包含的表达式不参与实际运算
	printf("%d\n", s);//0
	return 0;
}


int main()
{
	//强制类型转换
	int a = (int)3.14;
	printf("%d\n", a);//3
	return 0;
}
```

##### sizeof和数组

###### 练习

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//问：
//（1）、（2）两个地方分别输出多少？
//（3）、（4）两个地方分别输出多少？

void test1(int arr[])
{
	printf("%d\n", sizeof(arr));//(2)--随平台不同会有两个结果4/8
}
void test2(char ch[])
{
	printf("%d\n", sizeof(ch));//(4)--随平台不同会有两个结果4/8
}
int main()
{
	int arr[10] = { 0 };
	char ch[10] = { 0 };
	printf("%d\n", sizeof(arr));//(1)
	printf("%d\n", sizeof(ch));//(3)
	test1(arr);//传过去的是数组首元素地址
	test2(ch);//传过去的是数组首元素地址
	return 0;
}
```

#### 关系操作符

```c
>
>=
<
<=
!= 用于测试“不相等”
== 用于测试“相等”
```

这些关系运算符比较简单,但是我们要注意一些运算符使用时候的陷阱。
	  <font style="color:tomato;"> ⚠️在编程的过程中== 和=不小心写错，导致的错误。</font>

#### 逻辑操作符

```c
&& 逻辑与
|| 逻辑或
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int a = 0;
	int b = 5;
	//int c = a&&b;
	int c = a||b;
	printf("%d\n", c);//结果1--真 0--假
	return 0;
}
```

##### 360笔试题

```c
//程序输出的结果是什么？

#include <stdio.h>
int main()
{
	int i = 0, a = 0, b = 2, c = 3, d = 4;
	i = a++ && ++b && d++;
	//a++先使用后++,所以先为0,后面不计算,之后自增为1
	printf(" a = %d\n b = %d\n c = %d\n d = %d\n i = %d\n", a, b, c, d, i);
	return 0;
}

int main()
{
	int i = 0, a = 1, b = 2, c = 3, d = 4;
	//a++为真,后面逻辑或都不会进行计算,a自增1为2
	i = a++ || ++b || d++;
	printf(" a = %d\n b = %d\n c = %d\n d = %d\n i = %d\n", a, b, c, d, i);
	return 0;
}

```

#### 条件操作符/三目操作符

```matlab
exp1 ? exp2 : exp3
```

问号前面的条件表达式的部分是要测试的条件。

这就像 if 语句的括号中的表达式。如果条件是真的，则执行 ? 和 : 之间的语句；否则，执行 : 之后的部分。如果认为有帮助，可以在子表达式周围放置圆括号。
**如下所示：**

```c
(x < 0) ? (y = 10) : (Z = 20);
```

![三目操作符图例](http://c.biancheng.net/uploads/allimg/181115/2-1Q11512525J14.gif)

##### 练习

```c
1.
if (a > 5)
	b = 3;
else
	b = -3;
//转换成条件表达式，是什么样？

2.使用条件表达式实现找两个数中较大值。
```

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//题目1
int main()
{

	int a = 0;
	int b = 0;
	if (a > 5)
		b = 3;
	else
		b = -3;

	//等价于
	b = (a > 5 ? 3 : -3);

	return 0;
}

//题目2
int main()
{

	int a = 99;
	int b = 520;
	int max = 0;
	if (a > 5)
		max = a;
	else
		max = b;

	//等价于
	max = (a > b ? a : b);

	return 0;
}
```

#### 逗号表达式

```c
exp1, exp2, exp3, …expN
```

逗号表达式，就是用逗号隔开的多个表达式。 逗号表达式，从左向右依次执行。

整个表达式的结果是最后一个表达式的结果。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//代码例1
int main()
{
	int	a = 1;
	int b = 2;
	//括号内的a > b,a不产生值
	//a = b + 10 = 12
	//b = a+1 = 13
	//c = b = 13
	int c = (a > b, a = b + 10, a, b = a + 1);
	printf("%d\n", c);
	return 0;
}

//代码例2
int main()
{
	int	a = 1;
	int b = 2;
	int c = -1;
	int d = 0;
	if (a = b + 1, c = a / 2, d > 0)
		printf("判断为真,则输出此句\n");//d > 0条件为假,不能输出此句
	return 0;
}

//代码例3--伪代码实例
a = get_val();
count_val(a); 
while (a > 0)
{
		//业务处理
	a = get_val(); 
  count_val(a);
}

//如果使用逗号表达式，改写：
while (a = get_val(), count_val(a), a>0)
{
	//业务处理
}

```

#### 下标引用、函数调用和结构成员

##### [ ] 下标引用操作符

操作数：一个数组名 + 一个索引值

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int arr[10];//创建数组
	arr[9] = 10;//实用下标引用操作符。
	//[]的两个操作数是arr和9。
	return 0;
}
```

##### ()函数调用操作符 

接收一个或者多个操作数：第一个操作数是函数名，剩余的操作数就是传递给函数的参数。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

void test1()
{
	printf("看到这里的读者,\n");
}
void test2(const char *str)
{
	printf("%s\n", str);
}
int main()
{
	test1(); //实用（）作为函数调用操作符。
	test2("加油呀!\n");//实用（）作为函数调用操作符。
	return 0;
}
```

##### 访问一个结构的成员

> `. `结构体.成员名
> `->` 结构体指针`->`成员名

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//学生
//struct也是一种类型
//创建一个结构体类型--- struct Stu
struct Stu
{
	char name[20];//姓名
	int age;//年龄
	char id[20];//学号
};

int main()
{
	//使用struct Stu这个类型创建了一个学生对象s1,并初始化
	struct Stu s1 = {"张珊",20,"2021520"};
	/*printf("%s\n",s1.name);
	printf("%d\n", s1.age);
	printf("%s\n", s1.id);*/

	struct Stu* ps = &s1;
	//下面方式显得有些繁琐
	/*
	printf("%s\n", (*ps).name);
	printf("%d\n", (*ps).age);
	*/

	//C语言提供的简单方法
	//语法:结构体指针->成员名
	printf("%s\n", ps->name);
	printf("%d\n", ps->age);
	return 0;
}
```

### 表达式求值

<font style="color:skyblue;">表达式求值的顺序一部分是由操作符的优先级和结合性决定。</font>
	   同样，有些表达式的操作数在求值的过程中可能需要转换为其他类型。

#### 隐式类型转换

<font style="color:deepskyblue;">C的整型算术运算总是至少以缺省整型类型的精度来进行的。</font>
	   为了获得这个精度，表达式中的字符和短整型操作数在使用之前被转换为普通整型，这种转换称为<font style="color:hotpink;font-size:18px;">整型提升。</font>

##### <font style="color:gold;">整型提升的意义：</font>

>  表达式的整型运算要在CPU的相应运算器件内执行，CPU内整型运算器(ALU)的操作数的字节长度
> 一般就是int的字节长度，同时也是CPU的通用寄存器的长度。
> 		因此，即使两个char类型的相加，在CPU执行时实际上也要先转换为CPU内整型操作数的标准长
> 度。
> 	   通用CPU（general-purpose CPU）是难以直接实现两个8比特字节直接相加运算（虽然机器指令
> 中可能有这种字节相加指令）。所以，表达式中各种长度可能小于int长度的整型值，都必须先转
> 换为int或unsigned int，然后才能送入CPU去执行运算。

```c
char a,b,c;
...
a = b + c;
```

 b和c的值被提升为普通整型，然后再执行加法运算。
		加法运算完成之后，结果将被截断，然后再存储于a中。

##### 整体提升

整形提升是按照变量的数据类型的符号位来提升的

```c
//负数的整形提升
char c1 = -1;
变量c1的二进制位(补码)中只有8个比特位：
1111111
因为 char 为有符号的 char
所以整形提升的时候，高位补充符号位，即为1
提升之后的结果是：
11111111111111111111111111111111
  
//正数的整形提升
char c2 = 1;
变量c2的二进制位(补码)中只有8个比特位：
00000001
因为 char 为有符号的 char
所以整形提升的时候，高位补充符号位，即为0
提升之后的结果是：
00000000000000000000000000000001
//无符号整形提升，高位补0
```

代码实例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//00000000 00000000 00000000 00000011
	//00000011 - a
	char a = 3;
	//00000000 00000000 00000000 01111111
	//01111111 - b
	char b = 127;

	//a和b如何相加
	//00000000 00000000 00000000 00000011
	//00000000 00000000 00000000 01111111
	//00000000 00000000 00000000 10000010
	char c = a + b;
	//10000010 - c
	//整型提升,前面补1
	//11111111 11111111 11111111 10000010 --补码
	//11111111 11111111 11111111 10000001 --反码
	//10000000 00000000 00000000 01111110 --原码
	printf("%d\n", c);//整型打印,输出:-126
	return 0;
}
```

整形提升代码例:

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//实例1
int main()
{
	char a = 0xb6;
	short b = 0xb600;
	int c = 0xb6000000;
	if (a == 0xb6)
		printf("a\n");
	if (b == 0xb600)
		printf("b\n");
	if (c == 0xb6000000)
		printf("c\n");
	return 0;
}
//程序输出--c
```

实例1中的a, b要进行整形提升, 但是c不需要整形提升 a, b整形提升之后, 变成了负数, 所以表达式`a == 0xb6`, `b == 0xb600` 的结果是假, 但是c不发生整形提升, 则表达式`c == 0xb6000000` 的结果是真.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char c = 1;
	printf("%u\n", sizeof(c));//1
	printf("%u\n", sizeof(+c));//4
	printf("%u\n", sizeof(!c));//1
	return 0;
}
```

实例2中的, c只要参与表达式运算, 就会发生整形提升, 表达式 `+ c`, 就会发生提升, 所以`sizeof(+c) `是4个字节.
	   表达式` - c `也会发生整形提升, 所以`sizeof(-c) `是4个字节, 但是`sizeof(c)`, 就是1个字节.

#### 算术转换

如果某个操作符的各个操作数属于不同的类型，那么除非其中一个操作数的转换为另一个操作数的类型，否则操作就无法进行。

下面的层次体系称为<font style="color:deepskyblue;font-size:18px;">寻常算术转换</font>。

```c
long double
double
float
unsigned long int
long int
unsigned int
int
```

⚠️<font style="color:tomato">但是算术转换要合理，要不然会有一些潜在的问题。</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	float f = 3.14;
	int num = f;//隐式转换，会有精度丢失
	printf("%d\n",num);//3
	return 0;
}
```

#### 操作符的属性

复杂表达式的求值有三个影响的因素。

1. 操作符的优先级

2. 操作符的结合性

3. 是否控制求值顺序。

  🤔两个相邻的操作符先执行哪个？

  😃取决于他们的优先级。如果两者的优先级相同，取决于他们的结合性。


  ##### 操作符优先级

  [C语言运算符优先级和结合性一览表](http://c.biancheng.net/view/161.html)

  

⚠️<font style="color:gold;">规律：</font>

1. 结合方向只有三个是从右往左，其余都是从左往右。
2. 所有双目运算符中只有赋值运算符的结合方向是从右往左。
3. 另外两个从右往左结合的运算符也很好记，因为它们很特殊：一个是单目运算符，一个是三目运算符。
4. C语言中有且只有一个三目运算符。
5. 逗号运算符的优先级最低，要记住。
6. 此外要记住，对于优先级：算术运算符 > 关系运算符 > 逻辑运算符 > 赋值运算符。逻辑运算符中“逻辑非 !”除外。

#### <font style="color:red;">问题表达式</font>

**例1**

```c
//表达式的求值部分由操作符的优先级决定。
//表达式1
a*b + c*d + e*f
```

例1在计算的时候，由于比+的优先级高，只能保证，的计算是比+早，但是优先级并不能决定第三个*比第一个+早执行。

所以表达式的计算机顺序就可能是：

```c
a*b
c*d
a*b + c*d
e*f
a*b + c*d + e*f
  
或者：
a*b
c*d
e*f
a*b + c*d
a*b + c*d + e*f
```

**例2**

```c
c + --c;
```

同上，操作符的优先级只能决定自减--的运算在+的运算的前面，但是我们并没有办法得知，+操作符的左操作数的获取在右操作数之前还是之后求值，所以结果是不可预测的，是有歧义的。

**例3**

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//代码3-非法表达式
int main()
{
	int i = 10;
	i = i-- - --i * ( i = -3 ) * i++ + ++i;
	printf("i = %d\n", i);//vs输出--4
	return 0;
}
````

<font style="color:tomato;">例3在不同编译器中测试结果是不同的</font>

**例4**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int fun()
{
	static int count = 1;
	return ++count;
}

int main()
{
	int answer;
	answer = fun() - fun() * fun();
	printf("%d\n", answer);//输出多少？
	return 0;
}
```

 		 虽然在大多数的编译器上求得结果都是相同的。

​		 但是上述代码answer = fun() - fun() * fun(); 中我们只能通过操作符的优先级得知：先算乘法，再算减法。

​	 	函数的调用先后顺序无法通过操作符的优先级确定。

**例5**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	int i = 1;
	int ret = (++i) + (++i) + (++i);
	printf("%d\n", ret);//12
	printf("%d\n", i);//4
	return 0;
}
//尝试在linux 环境gcc编译器，VS2013环境下都执行，看结果。
```

Linux环境的结果：`12` `4`

例5代码中的第一个+ 在执行的时候，第三个++是否执行，这个是不确定的，因为依靠操作符的优先级和结合性是无法决定第一个+ 和第三个前置++ 的先后顺序。

#### 🍎总结：

<font style="color:  #DAA520  ;">我们写出的表达式如果不能通过操作符的属性确定唯一的计算路径，那这个表达式就是存在问题的。</font>

