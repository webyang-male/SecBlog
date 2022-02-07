---
title: C基础分支和循环语句
tags: C
categories:
  - - 后端
    - C
description: C循环基础笔记
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 12838
date: 2021-02-22 00:24:16
---

> C语言是一门结构化的程序设计语言

程序结构:

​	1.顺序结构

​	2.选择结构

​	3.循环结构

------

分支语句
			if 
			switch
循环语句
			while 
			for
			do while
goto语句

### 什么是语句？

C语言中由一个分号 ; 隔开的就是一条语句。 比如：

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main(){
	printf("hehe"); 
	1+2;
	;//空语句
}
```

### if语句

语法结构： 

```c
//单分支
if(表达式)     
    语句; 

//双分支
if(表达式)
	语句1; 
else
    语句2;

//多分支    
if(表达式1)
    语句1; 
else if(表达式2)    
  	语句2; 
else
    语句3;
```

if代码例:

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码1
int main(){
	int age = 10;
	if(age <18)
		printf("未成年\n");
	return 0;
}

//代码2
int main(){
	int age = 18;
	if(age <18)
		printf("未成年\n");
	else
		printf("祝贺成年\n");
	return 0;
}

//代码3
int main(){
	int age = 18;
	if(age <18)
		printf("未成年\n");
	else if(age>=18 && age<30)
		printf("青年\n");
	else if(age>=30 && age<50)
		printf("中年\n");
	return 0;
}

//多次执行
int main(){
	int age = 18;
	if(age <18){
		printf("未成年\n");
		printf("游戏时间受限\n");
	}
	else 
	{
		if(age>=18 && age<30)
			printf("青年\n");
		else if(age>=30 && age<50)
			printf("中年\n");
		else if(age>=50 && age<70)
			printf("老年\n");
	}
}
```

<font style="color:skyblue;">如果表达式的结果为真，则语句执行。 </font>

**在C语言中如何表示真假？**
					0表示假，非0表示真。

#### 悬空else

```c
//例1
int main(){
	int a = 0;
	int b = 2;
	if(a == 1)
		if(b == 2)
		printf("加油\n");
		else
		printf("努力\n");
	return 0;
}

//例2
int main(){
	int a = 0;
	int b = 2;
	if(a == 1)
		if(b == 2)
		printf("加油\n");
	else
		printf("努力\n");
	return 0;
}
```

<font style="color:yellowgreen;">编译结果:</font>

​	例1和例2都不能输出任何结果,例1和例2代码除了缩进本质一致,不能输出结果原因是:else有`就近原则`,例1和例2`if`条件都为假,不能进入循环,因此不能输出

<font style="color:green;">改正：</font>

```c
//适当的使用{}可以使代码的逻辑更加清楚
//代码风格很重要
int main() {
	int a = 0;
	int b = 2;
	if(a == 1) 
	{
		if(b == 2) 
		{
			printf("hehe\n");
		}
	} 
	else 
	{
		printf("haha\n");
	}
	return 0;
}
```

#### if书写形式的对比

```c
//代码1
if (condition) {
	return x;
}
return y;

//代码2
if(condition) {
	return x;
} else {
	return y;
}

//代码3
int num = 1;
if(num == 5) {
	printf("hehe\n");
}

//代码4
int num = 1;
if(5 == num) {
	printf("hehe\n");
}
```

**结论:**

<font style="color:yellowgreen;">代码2和代码4更好，逻辑更加清晰，不容易出错。</font>

------

<font style="color:gold;font-size:19px;">练习:</font>

1.判断一个数是否为奇数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main()
{
	int x;
	printf("请输入一个整数\n");
	scanf("%d",&x);
	if(x % 2 == 0)
	{
		printf("您输入的是偶数\n");
	}
	else
	{
		printf("您输入的是奇数\n");
	}
}

//最简化方法是三目
```

2.输出1-100之间的奇数

```c
//高级方法----奇数，就是2的倍数再加上1，2n+1
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main()
{
	int i;
	for(i=1;i<100;i+=2)
	{
		printf("%d\t",i);
	}
	getchar();
	return 0;
}

//普通方法--本节知识点
int main()
{
	int i;
	for(i=1;i<=100;i++)
	{
		if(i%2 != 0)
		{
			printf("%d\t",i);
		}
	}
	return 0;
}
```

### switch语句

> switch语句也是一种分支语句。  常常用于多分支的情况。

🐸案例分析:

​	输入1-7,输出数字对应周一至周日

如果写成` if...else if ...else if`的形式太复杂，那我们就得有不一样的语法形式 ——— switch 语句。

#### if方法

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main()
{
	int day = 0;
	printf("请输入1至7的整数\n");
	scanf("%d",&day);
	if(1 == day)
		printf("今天是周1\n");
	else if(2 == day)
		printf("今天是周2\n");
	else if(3 == day)
		printf("今天是周3\n");
	else if(4 == day)
		printf("今天是周4\n");
	else if(5 == day)
		printf("今天是周5\n");
	else if(6 == day)
		printf("今天是周6\n");
	else if(7 == day)
		printf("今天是周7\n");
	return 0;
}
```

#### **switch方法**

> switch(整型表达式) 
> 		{
>    			 语句项； 
> 		}

##### 语句项

```c
//case语句如下： 
case 整形常量表达式:     
语句;
```

##### break

在switch语句中，我们没法直接实现分支，搭配break使用才能实现真正的分支。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int day = 0;
	printf("请输入1至7的整数\n");
	scanf("%d",&day);
	switch(day) {
	case 1://这里举例写  case 1+0: 也正确
		printf("星期一\n");
		break;
	case 2:
		printf("星期二\n");
		break;
	case 3:
		printf("星期三\n");
		break;
	case 4:
		printf("星期四\n");
		break;
	case 5:
		printf("星期五\n");
		break;
	case 6:
		printf("星期六\n");
		break;
	case 7:
		printf("星期天\n");
		break;
	}
	return 0;
}
```

✏️<font style="color:lightpink;">break语句的实际效果是把语句列表划分为不同的部分。</font>

有时候我们的需求变了：
1. 输入1-5输出的是“weekday”;
2. 输入6-7输出“weekend”

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//switch代码演示 
int main() {
	int day = 0;
	printf("请输入1至7的整数\n");
	scanf("%d",&day);
	switch(day) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			printf("weekday\n");
			break;
		case 6:
		case 7:
		    printf("weekend\n");
			break;
	}
	return 0;
}
```

😊编程好习惯

> 在最后一个 case 语句的后面加上一条 break语句。  （之所以这么写是可以避免出现在以前的最 后一个 case 语句后面忘了添加 break语句）。

#### default子句

<font style="color:#F0E68C;">如果表达的值与所有的case标签的值都不匹配怎么办？</font>

​		 其实也没什么，结构就是所有的语句都被跳过而已。
​				程序并不会终止，也不会报错，因为这种情况在C中并不认为适合错误。

<font style="color:#F0E68C;">如果你并不想忽略不匹配所有标签的表达式的值时该怎么办呢？ </font>

​	你可以在语句列表中增加一条default子句，把下面的标签
​						`default：`
​			写在<font style="color:orange;">任何一个</font>case标签可以出现的位置。

<font style="color:deepskyblue;">当 switch表达式的值并不匹配所有case标签的值时，这个default子句后面的语句就会执行。 所以，每个switch语句中只能出现一条default子句。
但是它可以出现在语句列表的任何位置，而且语句流会像贯穿一个case标签一样贯穿default子句.</font>

````c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int day = 0;
	printf("请输入1至7的整数\n");
	scanf("%d",&day);
	switch(day) {
	case 1:
		printf("星期一\n");
		break;
	case 2:
		printf("星期二\n");
		break;
	case 3:
		printf("星期三\n");
		break;
	case 4:
		printf("星期四\n");
		break;
	case 5:
		printf("星期五\n");
		break;
	case 6:
		printf("星期六\n");
		break;
	case 7:
		printf("星期天\n");
		break;
	default:
		printf("用户输入错误\n");
		break;
	}
	return 0;
}
````

😊编程好习惯

> 在每个 switch 语句中都放一条default子句是个好习惯，甚至可以在后边再加一个 break 。

练习:

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int n = 1;
	int m = 2;
	switch (n) {
		case 1:
			m++;
		case 2:
			n++;
		case 3:
			switch (n) {
			//switch允许嵌套使用              
				case 1:
					n++;
				case 2:
					m++;
					n++;
					break;
			}
		case 4:
			m++;
			break;
		default:
			break;
		}
	printf("m = %d, n = %d\n", m, n);//输出m =5,n=3
	return 0;
}
//解析:break终止最近的代码
```

### while循环

当条件满足的情况下，if语句后的语句执行，否则不执行。但是这个语句只会执行一次。 但是我们发现生活中很多的实际的例子是：同一件事情我们需要完成很多次。
C语言中给我们引入了：while语句，可以实现循环。

> ```c
> //while 语法结构 
> while(表达式)
> 		循环语句
> ```

代码例:

​		在屏幕上打印1-10的数字

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 1;
	while(i<=10) {
		printf("%d\n", i);
		i = i+1;
	}
	return 0;
}
```

#### while语句中的break和continue

##### break介绍

```c
//break 代码实例
int main() {
	int i = 1;
	while(i<=10) {
		if(i == 5) 
			break;
		printf("%d", i);//输出--1234
		i = i+1;
	}
	return 0;
}
```

✏️<font style="color:deepskyblue;">总结：</font>
			其实在循环中只要遇到break，就停止后期的所有的循环，直接终止循环。  所以：while中的 break是用于<font style="color:tomato;">永久</font>终止循环的。

##### continue介绍

```c
//continue 代码实例1
int main()
{
	int i = 1; 
	while(i<=10)
	{
		if(i == 5)
			continue; 
		printf("%d ", i); //输出--1234,程序未终止
		i = i+1;
	}
	return 0;
}
//这里代码为死循环
```

```c
//continue 代码实例1
int main()
{
	int i = 1; 
	while(i<=10)
	{
		i++;
		if(i == 5)
			continue; //这里意思就是在变量i等于5的时候停止本次循环,跳过后面代码直接进行下一次循环
		printf("%d ", i); //输出--2 3 4 6 7 8 9 10 11
	}
	return 0;
}
```

✏️<font style="color:deepskyblue;">总结:</font>
				continue是用于终止<font style="color:tomato;">本次循环</font>的，也就是本次循环中continue后边的代码不会再执行，而是直接 跳转到while语句的判断部分。进行下一次循环的入口判断。

#### getchar()与putchar()

> getchar()函数的作用是从计算机终端（一般为键盘）获取一个无符号字符。getchar()函数只能接收一个字符，其函数值就是从输入设备获取到的字符。
>
> putchar语法结构为 **int putchar(int char)** ，其功能是把参数 char 指定的字符（一个无符号字符）写入到标准输出 stdout 中，为C 库函数 ，包含在C 标准库 <stdio.h>中。其输出可以是一个[字符](https://baike.baidu.com/item/字符/4768913)，可以是介于0~127之间的一个十进制整型数（包含0和127），也可以是用[char](https://baike.baidu.com/item/char/5156054)定义好的一个字符型变量。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码1
int main() {
	//int ch =getchar();
	//EOF--end of file,值为-1
	int ch = 0;
	//ctr+z组合键结束程序
	while((ch = getchar()) != EOF){
		putchar(ch);
	}
	//printf("%c\n",ch);
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码2
int main() {
	int ret = 0;
	int ch = 0;
	char password[20] = {0};
	printf("请输入密码:>");
	scanf("%s",password);//输入密码:并存放在Passsword数组中
	//程序运行到这里时,缓冲区还剩余一个'\n'
	printf("请确认密码(Y/N):>");

	//getchar()循环读取一下'\n',让缓冲区内容清空,使程序正常往下运行
	while ((ch = getchar()) != '\n')
	{
		//这个循环杜绝了密码带空格情况如--1234 abc
	}
	ret = getchar();//Y/N
	if(ret == 'Y'){
		printf("确认成功!\n");
	}else{
		printf("放弃确认!\n");
	}
	return 0;
}
```

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码3
//只打印字符0-9范围的数字字符,具体可参考ASCII码表
int main()
{	
	int ch = 0;
	while ((ch = getchar()) != EOF)
	{
		if (ch < '0' || ch > '9')
			continue;
			putchar(ch);     
	}
	return 0; 
}
```

### for循环

语法:

```matlab
for(表达式1；表达式2；表达式3) 
	循环语句；
```

> 表达式1 表达式1为初始化部分，用于初始化循环变量的。 	   
> 	   表达式2 表达式2为条件判断部分，用于判断 循环时候终止。 
> 	   表达式3 表达式3为调整部分，用于循环条件的调整。

使用for循环  在屏幕上打印1-10的数字。

```c
int main()
{
	int i = 0;
	//for(i=1/*初始化*/; i<=10/*判断部分*/; i++/*调整部分*/) 
	for(i=1; i<=10; i++)
	{
		printf("%d", i);
	}
	return 0; 
}
```

#### for循环和while循环对比

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>
//代码1
int main() {
	int i = 0;
	//实现相同的功能，使用while 
	i=1;//初始化部分
	while(i<=10)//判断部分 
	{
		printf("hehe\n"); 
		i = i+1;//调整部分
	}
}

//代码2
int main() {
  int i = 0;
	//实现相同的功能
	for(i=1; i<=10; i++) {
		printf("hehe\n"); 
	}
}
```

可以发现在while循环中依然存在循环的三个必须条件，但是由于风格的问题使得三个部分很可能偏离 较远，这样查找修改就不够集中和方便。所以，for循环的风格更胜一筹。 for循环使用的频率也最高。

#### break和continue

我们发现在for循环中也可以出现break和continue，他们的意义和在while循环中是一样的。  但是还是有些差异：

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码1
int main() {
	int i = 0;
	for (i=1; i<=10; i++) {
		if(i == 5) 
			break;
		printf("%d ",i);//输出---1234
	}
	return 0;
}

//代码2
int main() {
	int i = 0;
	for (i=1; i<=10; i++) {
		if(i == 5) 
			continue;
		printf("%d ",i);//输出---1 2 3 4 6 7 8 9 10
	}
	return 0;
}

```

📖for语句的循环控制变量 一些建议：
1. 不可在for 循环体内修改循环变量，防止 for 循环失去控制。
2. 建议for语句的循环控制变量的取值采用<font style="color:hotpink;">“前闭后开区间”</font>写法。

```c
int i = 0;
//前闭后开的写法 
for(i=0; i<10; i++) 
{}

//两边都是闭区间 
for(i=0; i<=9; i++) 
{}
```

#### for循环打印数组

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main(){
	int arr[10] =  {0,1,2,3,4,5,6,7,8,9}; 
	int i;
  //前闭后开写法
	for( i = 0;i < 10;i++){
		printf("%d ",arr[i]);
	}
	return 0;
}
```

#### for循环的变种

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	//变种1 
	/*for(;;) {
		printf("hehe\n");
	}*/

	//变种2 
	int x,y;
	for (x = 0, y = 0;x<2 && y<5;++x,y++) {
		printf("hehe\n");
	}
	return 0;
}
```

<font style="color:skyblue;">变种1:</font>

```html
for循环的初始化、调整、判断都可以省略
但是∶
for循环的判断部分如果被省略，那判断条件就是:恒为正

⚠️如果不是非常熟练，建议大家不要随便省略
```

易错代码举例:

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//代码1只输出10次
int main() {
	int i = 0;
	int j = 0;
	for(;i<10;i++) {
		for(;j<10;j++) {
			printf("hehe\n");
		}

	}
	return 0;
}

//代码2打印100次
int main() {
	int i = 0;
	int j = 0;
	for(;i<10;i++) {
		for(j = 0;j<10;j++) {
			printf("hehe\n");
		}

	}
	return 0;
}
//for循环每一项条件都有他的意义
```

<font style="color:skyblue;">变种2:</font>

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	//输出2个hehe
	int x,y;
	for (x = 0, y = 0;x<2 && y<5;++x,y++) {
		printf("hehe\n");
	}
	return 0;
}

```

**练习:**

请问循环要循环多少次？

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 0;
	int k = 0;
	for(i=0,k=0;k=0;i++,k++){
		k++;
	}
	return 0;
}
//代码循环0次 for循环括号内判断条件k=0 为假,不进入循环
```

### do...while()循环 

do...while()语句的语法：

```
do
	循环语句； 
while(表达式);
```

do语句的特点

<font style="color:deepskyblue;">循环至少执行一次，使用的场景有限，所以不是经常使用。</font>

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 10;
	do {
		printf("%d\n", i);//输出10
	}
	while(i<10);
	return 0;
}
```

#### break和continue

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//break代码
int main() {
	int i = 0;
	do {
		if(5 == i)
			break;
		printf("%d\n", i);//输出01234
		i++;
	}
	while(i<10);
	return 0;
}

//continue代码
int main() {
	int i = 0;
	do {
		if(5 == i)
			continue;
		printf("%d\n", i);//输出01234后死循环
		i++;
	}
	while(i<10);
	return 0;
}
```

### 练习

1. 计算 n的阶乘。
2. 计算 1!+2!+3!+……+10!
3. 在一个有序数组中查找具体的某个数字n。  编写int binsearch(int x, int v[], int n); 功能：在v[0] <=v[1]<=v[2]<= ….<=v[n-1]的数组中查找x.
4. 编写代码，演示多个字符从两端移动，向中间汇聚。
5. 编写代码实现，模拟用户登录情景，并且只能登录三次。（只允许输入三次密码，如果密码正确则 提示登录成，如果三次均输入错误，则退出程序。

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>
#include <windows.h>//练习4--Sleep函数所需头文件
#include <stdlib.h>//练习4--system函数所需头文件

//练习1
int main()
{
	int i =0;
	int n =0;
	int ret = 1;//不能为0,否则阶乘结果恒为0
	printf("请输入正整数:\n");
	scanf("%d",&n);
	for(i = 1;i<=n;i++){
		ret = ret * i;
	}
	printf("ret = %d\n",ret);
	return 0;
}

//练习2
//方法1
int main()
{
	int i =0;
	int n =0;
	int ret = 1;
	int sum = 0;
	for(n = 1;n<=10;n++){
    ret = 1;
		for(i = 1;i<=n;i++){
			ret = ret * i;
		}
		//n的阶乘
		sum = sum + ret;
	}
	printf("sum = %d\n",sum);
	return 0;
}
//方法2
int main()
{
	int i =0;
	int n =0;
	int ret = 1;
	int sum = 0;
	for(n = 1;n <= 10;n++){
			ret = ret * n;
		//n的阶乘
		sum = sum + ret;
	}
	printf("sum = %d\n",sum);
	return 0;
}

//练习3
//常规--方法1
int main()
{	
	int arr[] = {1,2,3,4,5,6,7,8,9,10};
	int k = 7;//想要的数
	//写一个代码，在arr数组（有序的）中找到7
	int i = 0;//初始下标值
	int sz = sizeof(arr)/sizeof(arr[0]);
	for(i = 0;i<sz;i++){
		if(k == arr[i]){
			printf("找到了,下标是: %d\n",i);
			break;
		}
	}
	if(i == sz){
		printf("未找到\n");
	}

	return 0;
}
//二分法--方法2--算法更优
int main()
{	
	int arr[] = {1,2,3,4,5,6,7,8,9,10};
	int k = 7;//想要的数

	int sz = sizeof(arr)/sizeof(arr[0]);//计算元素个数
	int left = 0;//左下标
	int right = sz-1;//右下标

	while(left<=right){
		int mid = (left + right) / 2;
		if(arr[mid] > k){
			right = mid-1;
		}
		else if(arr[mid] < k){
			left = mid+1;
		}
		else{
			printf("找到了,下标是: %d\n",mid);
			break;
		}
	}
	while(left>right){
		printf("未找到\n");
	}
	return 0;
}

//练习4
//编写代码，演示多个字符从两端移动，向中间汇聚
int main() {
	char arr1[] = "welcome to bit!!!";
	char arr2[] = "#################";
	int left = 0;
	//int right = sizeof(arr1)/sizeof(arr1[0])-2;
	//-2是正确计算最后一个感叹号下标,字符串数组arr1最后隐含一个字符'\0'
	//-1是用在整型int数组
	int right = strlen(arr1)-1;//下标恒比元素个数少1
	printf("%s\n",arr2);//展示被替换数组
	
	//while循环实现
	while(left<=right) {
		arr2[left] = arr1[left];
		arr2[right] = arr1[right];
		printf("%s\n", arr2);

		//1秒间歇,方便看到过程
		Sleep(1000);
		left++;
		right--;
		
		//system执行系统命令的一个函数
		//cls--清空屏幕
		system("cls");

	}

	printf("%s\n", arr2);//展示最终效果
	return 0;
}

//练习5
int main() {
	int i = 0;
	char psw[10] = {0};
	for (i = 0;i < 3;i++) 
	{
		printf("请输入密码:\n");
		scanf("%s",psw);
		//==不能用来比较两介字符串是否相等,应该使用一个库函数-strcmp
		if (strcmp(psw,"520") == 0)
		{
			printf("密码正确\n");
			break;
		}
		else
		{
			printf( "哦豁!密码错误\n");
		}
	}
	if(i == 3)
		printf("3次密码输入错误:exit\n"); 
	return 0;
}
```

6.实现从大到小的3个数输出

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int a = 0;
	int b = 0;
	int c = 0;
	printf("请输入3个数字:\n");
	scanf("%d%d%d",&a,&b,&c);
	/*算法实现
	*a放最大值
	*b放第二大
	c放最小值
	*/
	if(a<b){
		int tmp = a;
		a = b;
		b = tmp;
	}
	if(a<c){
		int tmp = a;
		a = c;
		c = tmp;
	}
	if(b<c){
		int tmp = b;
		b = c;
		c = tmp;
	}
	printf("排序结果为:%d %d %d",a,b,c);//注意输入数字带入空格
	return 0;
}
```

7.打印1-100中3的倍数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 0;
	for(i = 1;i<=100;i++){
		if(i%3 == 0){
			printf("%d ",i);
		}
	}
	return 0;
}
```

8.给定2个数,求其最大公约数

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//辗转相除法
int main() {
	int m = 0;
	int n = 0 ;
	int r = 0;
	printf("请输入2个数字:\n");
	scanf("%d%d",&m,&n);
	while(m % n){
		r = m%n;
		m = n;
		n = r;
	}
	printf("====================\n");
	printf("最大公约数为:%d\n",n);
	printf("====================\n");
	return 0;
}
```

9.求得1000-2000年的所有闰年

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//可用逻辑或--||简化
int main() {
	int year = 0;
	int count = 0;
	for(year = 1000;year<=2000;year++){
		//判断闰年规则
		//1.非整百年:能被4整除的为闰年。(如2004年就是闰年,2001年不是闰年)
		//2.整百年:能被400整除的是闰年。(如2000年是闰年,1900年不是闰年)
		if(year%4==0 && year%100 !=0){
			printf("%d ",year);
			count++;
		}
		else if(year%400==0){
			printf("%d ",year);
			count++;
		}
	}
	printf("\ncount=%d\n",count);//求得闰年总数
	return 0;
}
```

10.打印100-200的素数

> 曾称*质数*。一个大于1的正整数，如果除了1和它本身以外，不能被其他正整数整除，就叫*素数*。如2，3，5，7，11

**试除法**

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 0;
	int count = 0;//初始化素数总数
	for(i = 100;i<=200;i++)
	{
		//判断i是否为素数
		//产生2->i-1的数字
		int j = 0;
		for(j = 2;j<i;j++){
			if(i%j == 0){
				break;
			}	
		}
		//走到这里有2种情况:1.前面if完成2.for循环推荐不满足
		if(j == i){
			count++;
			printf("%d ",i);
		}
	}	
	printf("\ncount=%d\n",count);//求得素数总数
	return 0;
}

//优化版--方法2
	/*i= a * b;
	*16 = 2 * 8 = 4 * 4;
	*a和b中至少有一个 <= i的开平方
	*/
#include <math.h>
int main() {
	int i = 0;
	int count = 0;//初始化素数总数
	for(i = 100;i<=200;i++)//此处i++改为i+=2跳过偶数--方法3
	{
		//判断i是否为素数
		//产生2->i-1的数字
		int j = 0;
		//sqrt--开平方的数学库函数
		for(j = 2;j <= sqrt(i);j++){
			if(i%j == 0){
				break;
			}	
		}
		//走到这里有2种情况:1.前面if完成2.for循环推荐不满足
		if(j > sqrt(i)){
			count++;
			printf("%d ",i);
		}
	}	
	printf("\ncount=%d\n",count);//求得素数总数
	return 0;
}
```

[素数求解的n种境界]: https://blog.csdn.net/Tianzez/article/details/78086024

11.编写程序数一下1到100的所有整数中出现多少个数字9

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 0;
	int count = 0;
	for(i = 1;i<=100;i++)
	{
		if(i%10 == 9)
			count++;
		if(i/10 == 9)
			count++;
	}
	printf("count=%d\n",count);//20个
	return 0;
}
```

12.计算`1/1-1/2+1/3-1/4+1/5 ......+ 1/99 - 1/100`的值，打印出结果

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int i = 0;//分母初始化
	double sum = 0.0;
	int flag = 1;
	for(i = 1;i<=100;i++)
	{
		sum += flag*1.0/i;
		flag = -flag;
		//printf("%lf\n",sum);
	}
	printf("%lf\n",sum);
	return 0;
}
```

13.求10个整数中最大值

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	int arr[] = {1,-2,3,4,5,6,7,8,9,-10};
	int max = arr[0];//最大值初始化

	int i = 0;//下标

	int sz = sizeof(arr)/sizeof(arr[0]);//计算元素个数
	for(i = 1;i<sz;i++){
		if(arr[i]>max){
			max = arr[i];
		}
	}
	printf("max=%d\n",max);
	return 0;
}
```

14打印九九乘法表

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main(){
    int i,j,n;
    for(i=1;i<=9;i++){
      //打印一行
        for(j=1;j<=i;j++)
            printf("%d*%d=%-2d  ",i,j,i*j);
        
        printf("\n");
    }

    return 0;
}

```

[C语言九九乘法表（五种输出形式)](http://c.biancheng.net/view/494.html)

15.猜数字游戏(1-100)

电脑出随机数,玩家猜,判断対误

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

void menu()
{
	printf("**********************************\n");
	printf("***********   1.play     *********\n");
	printf("***********   0.exit     *********\n");
	printf("**********************************\n");
}

void game()
{	
	int ret = 0;//接收随机数
	int guess = 0;//接收猜的数字

	//1.生成1-100随机数
	//RAND_MAX---32767
	ret = rand()%100+1;//rand()库文件函数,需要先调用rand()函数
	//printf("%d\n",ret);
	//2.猜数字
	while(1)
	{
		printf("请猜数字:>\n");
		scanf("%d",&guess);
		if(guess > ret)
		{
			printf("----数字猜大了!----\n");
		}
		else if(guess < ret)
		{
			printf("----数字猜小啦!----\n");
		}
		else 
		{
			printf("----您可真厉害!猜中啦!!!----\n");
			break;//猜对游戏中止
		}
	}
}

int main() {
	int input = 0;//键盘输入值初始化

	//时间戳设置随机数的生成起始点
	//time_t time(time_t *timer)
	srand((unsigned int)time(NULL));//srand()函数需要一个随机变化的整型数值

	do
	{
		menu();
		printf("请选择选项:>\n");
		scanf("%d",&input);
		switch(input)
		{
		case 1:
			printf("*****您选择开始游戏!*****\n");
			game();//游戏函数
			break;
		case 0:
			printf("----已退出游戏!----\n");
			break;
		default:
			printf("----选择错误!----\n");
			break;
		}
	}while(input);

	return 0;
}
```

### goto语句

 C语言中提供了可以随意滥用的 goto语句和标记跳转的标号。
		从理论上 goto语句是没有必要的，实践中没有goto语句也可以很容易的写出代码。
		但是某些场合下goto语句还是用得着的，最常见的用法就是终止程序在某些深度嵌套的结构的处理过程
		<font style="color:skyblue;">例如一次跳出两层或多层循环。这种情况使用break是达不到目的的。它只能从最内层循环退出到上一层的循环。 </font>

goto代码例：

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

//这是一个死循环代码
int main() {
flag:
	printf("你好,C语言学习者!\n");
	goto flag;//flag是goto语句跳转的标识
	return 0;
}
```

例2

```c
#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <string.h>

int main() {
	printf("你好,C语言学习者!\n");
	goto flag;//flag是goto语句跳转的标识
	printf("你一定要");
flag:
	printf("好好学习鸭!\n");
	return 0;
}

//最终输出:
//你好,C语言学习者!
//好好学习鸭!
```

> goto语句的随意性较大,如果不加以限制,就会破坏结构化设计风格,会导致代码晦涩难懂,降低可读性。

goto语言真正适合的场景如下：

```c
for (...)
  for (...) {
	for (...) {
		if(disaster)                 
			goto error;
	}
}
…
error:
	if(disaster)
	// 处理错误情况

```

