---
title: C文件操作
tags: C
categories:
  - - 后端
    - C
description: C进阶文件操作学习笔记
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 15562
date: 2021-05-09 16:31:37
---

### 大纲

- 文件概念
- 文件名
- 文件类型
- 文件缓冲区
- 文件指针
- 文件的打开和关闭
- 文件的顺序读写
- 文件的随机读写
- 文件结束的判定

### 文件概念

磁盘上的文件是文件。

但是在程序设计中，我们一般谈的文件有两种：程序文件、数据文件

#### 	    程序文件

​				包括源程序文件（后缀为.c）,目标文件（windows环境后缀为.obj）,可执行程序（windows环境后缀为.exe）。

#### 		数据文件

​				文件的内容不一定是程序，而是程序运行时读写的数据，比如程序运行需要从中读取数据的文件，或者输出内容的文件。

### 文件名

一个文件要有一个唯一的文件标识，以便用户识别和引用。

文件名包含3部分：文件路径+文件名主干+文件后缀

例如：` c:\code\test.txt`

<font style="color:lightskyblue;">为了方便起见，文件标识常被称为文件名。</font>

### 文件类型

根据数据的组织形式，数据文件被称为文本文件或者二进制文件。

数据在内存中以二进制的形式存储，如果不加转换的输出到外存，就是二进制文件。

#### 数据在内存中的存储方式

<font style="color:deepskyblue;">字符一律以ASCII形式存储，数值型数据既可以用ASCII形式存储，也可以使用二进制形式存储。</font>

如有整数10000，如果以ASCII码的形式输出到磁盘，则磁盘中占用5个字节（每个字符一个字节），而二进制形式输出，则在磁盘上只占4个字节（VS2013测试）。

![C.jpg](https://s1.imagehub.cc/images/2021/05/09/C.jpg)

**测试代码：**

⚠️<font style="color:orange;">需在同一C工程文件夹下</font>

建立`test.txt`和`QA8.c`2个文件

`QA8.c`代码

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	int a = 10000;
	FILE* pf = fopen("test.txt", "wb");//w-读权限 b-二进制写入
	fwrite(&a, 4, 1, pf);//二进制的形式写到文件中
	fclose(pf);
	pf = NULL;
	return 0;
}
````

🔸如果未建立`test.txt`文件,则会自动创建一个

[![eefeb1d54cdfb0196b5509c7b963eefd.md.png](https://s1.imagehub.cc/images/2021/05/09/eefeb1d54cdfb0196b5509c7b963eefd.png)](https://www.imagehub.cc/image/Q5yZv)

### 文件缓冲区

ANSIC 标准采用“缓冲文件系统”处理的数据文件的，所谓缓冲文件系统是指系统自动地在内存中为程序中每一个正在使用的文件开辟一块“文件缓冲区”。

从内存向磁盘输出数据会先送到内存中的缓冲区，装满缓冲区后才一起送到磁盘上。如果从磁盘向计算机读入数据，则从磁盘文件中读取数据输入到内存缓冲区（充满缓冲区），然后再从缓冲区逐个地将数据送到程序数据区（程序变量等）。

<font style="color:skyblue;">缓冲区的大小根据C编译系统决定的。</font>

![C-.jpg](https://s1.imagehub.cc/images/2021/05/09/C-.jpg)

### 文件指针

缓冲文件系统中，关键的概念是“文件类型指针”，简称“文件指针”。

每个被使用的文件都在内存中开辟了一个相应的文件信息区，用来存放文件的相关信息（如文件的名字，文件状态及文件当前的位置等）。这些信息是保存在一个结构体变量中的。该结构体类型是有系统声明的，取名`FILE`.

VS编译环境提供的`stdio.h `头文件中有以下的`FILE`文件类型申明:

```c
struct _iobuf {
char *_ptr;
int _cnt;
char *_base;
int _flag;
int _file;
int _charbuf;
int _bufsiz;
char *_tmpfname;
};
typedef struct _iobuf FILE;
```

不同的C编译器的FILE类型包含的内容不完全相同，但是大同小异。

每当打开一个文件的时候，系统会根据文件的情况自动创建一个FILE结构的变量，并填充其中的信息，使用者不必关心细节。

<font style="color:deepskyblue;">一般都是通过一个FILE的指针来维护这个FILE结构的变量，这样使用起来更加方便。</font>

下面我们可以创建一个FILE*的指针变量:

````c
FILE* pf;//文件指针变量
````

定义pf是一个指向FILE类型数据的指针变量。可以使pf指向某个文件的文件信息区（是一个结构体变量）。通过该文件信息区中的信息就能够访问该文件。<font style="color:lightskyblue;">即，通过文件指针变量能够找到与它关联的文件。</font>

![C.jpg](https://s1.imagehub.cc/images/2021/05/10/C.jpg)

### 文件的打开和关闭

文件在读写之前应该先<font style="color:skyblue;font-size:18px;">打开文件</font>，在使用结束之后应该<font style="color:skyblue;font-size:18px;">关闭文件</font>。

在编写程序的时候，在打开文件的同时，都会返回一个FILE*的指针变量指向该文件，也相当于建立了指针和文件的关系。

ANSIC 规定使用fopen函数来打开文件，fclose来关闭文件。

````c
FILE * fopen ( const char * filename, const char * mode );
int fclose ( FILE * stream );
````

##### 打开方式表：

| **文件使用方式** | **含义**                                 | **如果指定文件不存在** |
| ---------------- | ---------------------------------------- | ---------------------- |
| “r”（只读）      | 为了输入数据，打开一个已经存在的文本文件 | 出错                   |
| “w”（只写）      | 为了输出数据，打开一个文本文件           | 建立一个新的文件       |
| “a”（追加）      | 向文本文件尾添加数据                     | 出错                   |
| “rb”（只读）     | 为了输入数据，打开一个二进制文件         | 出错                   |
| “wb”（只写）     | 为了输出数据，打开一个二进制文件         | 建立一个新的文件       |
| “ab”（追加）     | 向一个二进制文件尾添加数据               | 出错                   |
| “r+”（读写）     | 为了读和写，打开一个文本文件             | 出错                   |
| “w+”（读写）     | 为了读和写，建议一个新的文件             | 建立一个新的文件       |
| “a+”（读写）     | 打开一个文件，在文件尾进行读写           | 建立一个新的文件       |
| “rb+”（读写）    | 为了读和写打开一个二进制文件             | 出错                   |
| “wb+”（读写）    | 为了读和写，新建一个新的二进制文件       | 建立一个新的文件       |
| “ab+”（读写）    | 打开一个二进制文件，在文件尾进行读和写   | 建立一个新的文件       |

##### 代码实例

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	//打开文件test.txt
	//相对路径
	//.. 表示上一级路径
	//.  表示当前路径
	//fopen("../../test.txt", "r")
	//fopen("test.txt", "r");
	
	//绝对路径的写法,\\防止转义
	//fopen("D:\\2021_C\\test_5_6\\test.txt", "r");

	FILE* pf = fopen("test.txt", "w");
	if(pf == NULL)
	{
		printf("%s\n", strerror(errno));
		return 0;
	}
	//打开成功
	//写文件,创建新文件(即使存在),内容清空

	//关闭文件
	fclose(pf);
	pf = NULL;

	return 0;
}
````

### 文件的顺序读写

| **功能**       | **函数名** | **适用于** |
| -------------- | ---------- | ---------- |
| 字符输入函数   | fgetc      | 所有输入流 |
| 字符输出函数   | fputc      | 所有输出流 |
| 文本行输入函数 | fgets      | 所有输入流 |
| 文本行输出函数 | fputs      | 所有输出流 |
| 格式化输入函数 | fscanf     | 所有输入流 |
| 格式化输出函数 | fprintf    | 所有输出流 |
| 二进制输入     | fread      | 文件       |
| 二进制输出     | fwrite     | 文件       |

##### **写文件 单字符**

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pfWrite = fopen("test.txt", "w");
	if(pfWrite == NULL)
	{
		printf("%s\n", strerror(errno));
		return 0;
	}
	//写文件
	fputc('l', pfWrite);
	fputc('o', pfWrite);
	fputc('v', pfWrite);
	fputc('e', pfWrite);
	
	//关闭文件
	fclose(pfWrite);
	pfWrite = NULL;

	return 0;
}
//test.txt文件被写入love
````

##### **读文件 单字符**

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pfRead = fopen("test.txt", "r");
	if(pfRead == NULL)
	{
		printf("%s\n", strerror(errno));
		return 0;
	}
	//读文件
	printf("%c", fgetc(pfRead));//l
	printf("%c", fgetc(pfRead));//o
	printf("%c", fgetc(pfRead));//v
	printf("%c", fgetc(pfRead));//e

	//关闭文件
	fclose(pfRead);
	pfRead = NULL;

	return 0;
}
//输出test.txt文件的love
```

##### 输入输出 单字符

```c
//从键盘输入
//输出到屏幕.
//键盘&屏幕都是外部设备

//键盘-标准输入设备- stdin
//屏幕-标准输出设备- stdout
//是一个程序默认打开的两个流设备

//stdin FILE*
//stdout FILE*
//stderr FILE*

int main()
{
	printf("请输入一个字符:>\n");
	int ch = fgetc(stdin);
	fputc(ch, stdout);

	return 0;
}
```

##### 文本行输入函数

> 读取一行

`test.txt`

```
love undefined

//或者
//love 
//undefined

//看看输出结果有什么不同
```

`test.c`

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char buf[1024] = { 0 };

	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//读文件
	fgets(buf, 1024, pf);
	//printf("%s", buf);
	puts(buf);
	//puts对文本内容换行保留,并有自己的换行

	fclose(pf);
	pf = NULL;

	return 0;
}
````

##### 文本行输出函数

> 写入一行

<font style="color:orange;">`test.c`文件记得内容为空用作测试</font>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char buf[1024] = { 0 };

	FILE* pf = fopen("test.txt", "w");
	if (pf == NULL)
	{
		return 0;
	}
	//写文件
	fputs("hello\n", pf);
	fputs("world\n", pf);
//fputs不会有换行,如果需要自行加入\n

	fclose(pf);
	pf = NULL;

	return 0;
}

```

##### 键盘读取,屏幕输出

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	//从键盘读取一行文本信息
	char buf[1024] = {0};
	//fgets(buf, 1024, stdin);//从标准输入流读取
	//fputs(buf, stdout);//输出到标准输出流

	//等价于上面注释写法
	printf("请输入一行字符:>\n");
	gets(buf);
	puts(buf);

	return 0;
}
```

##### 格式化输出函数 fprintf

<div class="info">
<blockquote>
<p>
  需要test.txt作为测试文件,文本内容为空便于观察程序运行结果
</p>
</blockquote>
</div>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	int n;
	float score;
	char arr[10];
};

int main()
{
	struct S s = { 100, 3.14f, "bit" };
	FILE* pf = fopen("test.txt", "w");
	if (pf == NULL)
	{
		return 0;
	}
	//格式化的形式写文件
	fprintf(pf, "%d %f %s", s.n, s.score, s.arr);

	fclose(pf);
	pf = NULL;
	return 0;
}
```

##### 格式化输入函数 fscanf

<div class="warning">
<blockquote>
<p>
  不要清空上面test.txt文本内容,便于观察程序运行结果
</p>
 <p>
  或者自行写入数据类型匹配的结构体数据,观察程序运行结果
</p>
</blockquote>
</div>

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	int n;
	float score;
	char arr[10];
};

int main()
{
	struct S s = {0};

	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//格式化的输入数据
	fscanf(pf, "%d %f %s", &(s.n), &(s.score), s.arr);
	printf("%d %f %s\n", s.n, s.score, s.arr);

	fclose(pf);
	pf = NULL;
	return 0;
}
```

##### 屏幕输出

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	int n;
	float score;
	char arr[10];
};

int main()
{
	struct S s = { 0 };

	printf("请键盘输入相应数据:>\n");
	fscanf(stdin, "%d %f %s", &(s.n), &(s.score), s.arr);
	fprintf(stdout, "%d %.2f %s", s.n, s.score, s.arr);
	//%.2f -- 保留2小数位
	return 0;
}
````

##### 对比一组函数：

<div class="info">
<blockquote>
<p>
scanf/fscanf/sscanf
  </p>
  <p>
printf/fprintf/sprintf
</p>
</blockquote>
</div>

`scanf/printf`是针对标准输入流/标准输出流的格式化输入/输出语句

`fscanf/fprintf `是针对所有输入流/所有输出流的格式化输入/输出语句

`sscanf`是从字符串中读取格式化的数据

`sprintf`是把格式化数据输出成(存储到)字符串

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	int n;
	float score;
	char arr[10];
};


int main()
{
	struct S s = { 100, 3.14f, "abcdef" };
	struct S tmp = {0};
	char buf[1024] = { 0 };
	//把格式化的数据转换成字符串存储到buf
	sprintf(buf, "%d %f %s", s.n, s.score, s.arr);
	//printf("%s\n", buf);
	//从buf中读取格式化的数据到tmp中
	sscanf(buf, "%d %f %s", &(tmp.n), &(tmp.score), tmp.arr);

	printf("%d %f %s\n", tmp.n, tmp.score, tmp.arr);

	return 0;
}
```

##### 二进制输入 fread

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	char name[20];
	int age;
	double score;
};

int main()
{
	struct S s = { "张三", 20, 55.6 };

	FILE* pf = fopen("test.txt", "wb");
	if (pf == NULL)
	{
		return 0;
	}
	//二进制的形式写文件
	fwrite(&s, sizeof(struct S), 1, pf);

	fclose(pf);
	pf = NULL;
	return 0;
}
//查看test.txt文本发现写入了张三等数据,有乱码
```

##### 二进制输出 fwrite

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct S
{
	char name[20];
	int age;
	double score;
};

int main()
{
	//struct S s = { "张三", 20, 55.6 };
	struct S tmp = { 0 };

	FILE* pf = fopen("test.txt", "rb");
	if (pf == NULL)
	{
		return 0;
	}
	//二进制的形式读文件
	fread(&tmp, sizeof(struct S), 1, pf);
	printf("%s %d %lf\n", tmp.name, tmp.age, tmp.score);

	fclose(pf);
	pf = NULL;
	return 0;
}
```

### 文件的随机读写

#### fseek

> 根据文件指针的位置和偏移量来定位文件指针

```c
int fseek ( FILE * stream, long int offset, int origin );
```

##### 参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。
- **offset** -- 这是相对 whence 的偏移量，以字节为单位。
- **origin** -- 这是表示开始添加偏移 offset 的位置。它一般指定为下列常量之一：

| 常量     | 描述               |
| :------- | :----------------- |
| SEEK_SET | 文件的开头         |
| SEEK_CUR | 文件指针的当前位置 |
| SEEK_END | 文件的末尾         |

`test.txt`

````c
abcdef
````

`fseek_test.c`

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//1.定位文件指针
	fseek(pf, 2, SEEK_SET);
	//2.读取文件
	int ch = fgetc(pf);
	printf("%c\n", ch);//c

	fclose(pf);
	pf = NULL;

	return 0;
}
````

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//1.定位文件指针
	fseek(pf, -4, SEEK_END);
	//2.读取文件
	int ch = fgetc(pf);
	printf("%c\n", ch);//c

	fclose(pf);
	pf = NULL;

	return 0;
}
````

<font style="color:orange;">负号前移，正号后移。</font>

#### ftell

<div class="success">
<blockquote>
<p>返回文件指针相对于起始位置的偏移量</p>
</blockquote>
</div>

````c
long int ftell ( FILE * stream );
````

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//1.定位文件指针
	fseek(pf, -2, SEEK_END);
	int ch = fgetc(pf);//e
	printf("%c\n", ch);
	int pos = ftell(pf);
	printf("%d\n", pos);//5

	fclose(pf);
	pf = NULL;

	return 0;
}

````

#### rewind

<div class="info">
<blockquote>
<p>让文件指针的位置回到文件的起始位置</p>
</blockquote>
</div>

````c
void rewind ( FILE * stream );
````

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		return 0;
	}
	//1.定位文件指针
	fseek(pf, -2, SEEK_END);
	int ch = fgetc(pf);//e
	printf("%c\n", ch);

	rewind(pf);
	ch = fgetc(pf);
	printf("%c\n", ch);//a

	fclose(pf);
	pf = NULL;

	return 0;
}
````

### 文件结束判定

#### <font style="color:red;">错误使用的feof</font>

<div class="danger">
<blockquote>
<p>牢记：在文件读取过程中，不能用feof函数的返回值直接用来判断文件的是否结束。</p>
<p>
而是应用于当文件读取结束的时候，判断是读取失败结束，还是遇到文件尾结束。
</p>
</blockquote>
</div>

##### ✏️ 要点

1. 文本文件读取是否结束，判断返回值是否为EOF （fgetc），或者NULL（fgets）
    例如：
    `fgetc`判断是否为`EOF`.
    `fgets`判断返回值是否为`NULL`.
2. 二进制文件的读取结束判断，判断返回值是否小于实际要读的个数。
例如：
`fread`判断返回值是否小于实际要读的个数。

**EOF**

````c
int main()
{
	//EOF
	//feof();//EOF - end of file - 文件结束标志
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
		return 0;
	int ch = fgetc(pf);
	printf("%d\n", ch);//-1

	fclose(pf);
	pf = NULL;

	return 0;
}
````

#### <font style="color:#3CB371;">正确使用</font>

##### 文本文件

###### perro

> C 库函数 **void perror(const char \*str)** 把一个描述性错误消息输出到标准错误 stderr。首先输出字符串 **str**，后跟一个冒号，然后是一个空格。

```c
void perror(const char *str)
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
	//strerror - 把错误码对应的错误信息的字符串地址返回
	//printf("%s\n", strerror(errno));
	
	//perror
	FILE* pf = fopen("test2.txt", "r");
	if (pf == NULL)
	{
		perror("open file test2.txt");//自定义错误描述
		return 0;
	}
	//读文件
	
	fclose(pf);
	pf = NULL;

	return 0;
}
```

###### 完整案例

例1

````c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
	int c; // 注意：int，非char，要求处理EOF
	FILE* fp = fopen("test.txt", "r");
	if (!fp) {//判断文件是否存在
		perror("File opening failed");
		return EXIT_FAILURE;
	}
	//fgetc 当读取失败的时候或者遇到文件结束的时候，都会返回EOF
	while ((c = fgetc(fp)) != EOF) // 标准C I/O读取文件循环
	{
		putchar(c);
	}
	//判断是什么原因结束的
	if (ferror(fp))
	{
		printf("\n");
		puts("I/O error when reading");
	}

	else if (feof(fp))
	{
		printf("\n");
		puts("End of file reached successfully");
	}
	fclose(fp);
}
````

例2

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	FILE* pf = fopen("test.txt", "r");
	if (pf == NULL)
	{
		perror("open file test.txt");
		return 0;
	}
	//读文件
	int ch = 0;
	while ((ch = fgetc(pf)) != EOF)
	{
		putchar(ch);
	}
	printf("\n");
	if (ferror(pf))
	{
		printf("error\n");
	}
	else if (feof(pf))
	{
		printf("end of file\n");
	}

	fclose(pf);
	pf = NULL;

	return 0;
}
```

##### 二进制文件

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum { SIZE = 5 };
int main(void)
{
	double a[SIZE] = { 1.0, 2.0, 3.0, 4.0, 5.0 };
	double b = 0.0;
	size_t ret_code = 0;
	FILE *fp = fopen("test.bin", "wb"); // 必须用二进制模式
	fwrite(a, sizeof(*a), SIZE, fp); // 写 double 的数组
	fclose(fp);
	fp = fopen("test.bin", "rb");
	// 读 double 的数组
	while ((ret_code = fread(&b, sizeof(double), 1, fp)) >= 1)
	{
		printf("%lf\n", b);
	}
	if (feof(fp))
		printf("Error reading test.bin: unexpected end of file\n");
	else if (ferror(fp)) {
		perror("Error reading test.bin");
	}
	fclose(fp);
	fp = NULL;
}
```

### 🌐函数文档参考链接：

https://zh.cppreference.com/w/c

### C 错误处理

> C 或 UNIX 函数调用返回 1 或 NULL，同时会设置一个错误代码 **errno**，该错误代码是全局变量，表示在函数调用期间发生了错误。可以在 errno.h 头文件中找到各种各样的错误代码。
>
> 所以，C 程序员可以通过检查返回值，然后根据返回值决定采取哪种适当的动作。开发人员应该在程序初始化时，把 errno 设置为 0，这是一种良好的编程习惯。0 值表示程序中没有错误。

#### errno、perror() 和 strerror()

C 语言提供了 **perror()** 和 **strerror()** 函数来显示与 **errno** 相关的文本消息。

- **perror()** 函数显示您传给它的字符串，后跟一个冒号、一个空格和当前 errno 值的文本表示形式。
- **strerror()** 函数，返回一个指针，指针指向当前 errno 值的文本表示形式。

```c
#include <stdio.h>
#include <errno.h>
#include <string.h>
 
extern int errno ;
 
int main ()
{
   FILE * pf;
   int errnum;
   pf = fopen ("unexist.txt", "rb");
   if (pf == NULL)
   {
      errnum = errno;
      fprintf(stderr, "错误号: %d\n", errno);
      perror("通过 perror 输出错误");
      fprintf(stderr, "打开文件错误: %s\n", strerror( errnum ));
   }
   else
   {
      fclose (pf);
   }
   return 0;
}
```

```
错误号: 2
通过 perror 输出错误: No such file or directory
打开文件错误: No such file or directory
```

#### ferror()

```c
int ferror(FILE *stream)
```

##### 参数

stream -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

##### 返回值

如果设置了与流关联的错误标识符，该函数返回一个非零值，否则返回一个零值。

```c
#include <stdio.h>

int main()
{
   FILE *fp;
   char c;

   fp = fopen("file.txt", "w");

   c = fgetc(fp);
   if( ferror(fp) )
   {
      printf("读取文件：file.txt 时发生错误\n");
   }
   clearerr(fp);
   if( ferror(fp) )
   {
      printf("读取文件：file.txt 时发生错误\n");
   }
   fclose(fp);

   return(0);
}
```

假设我们有一个文本文件 **file.txt**，它是一个空文件。让我们编译并运行上面的程序，因为我们试图读取一个以只写模式打开的文件，这将产生以下结果。

```
读取文件：file.txt 时发生错误
```

