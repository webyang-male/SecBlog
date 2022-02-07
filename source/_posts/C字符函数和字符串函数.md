---
title: C字符函数和字符串函数
tags: C
categories:
  - - 后端
    - C
description: 字符函数和字符串函数进阶学习
cover: https://cdn.jsdelivr.net/gh/webyang-male/CDN/imgs/bg_c.png
abbrlink: 48498
date: 2021-05-04 23:34:16
---

### 大纲

**求字符串长度**
strlen
**长度不受限制的字符串函数**
strcpy
strcat
strcmp
**长度受限制的字符串函数介绍**
strncpy
strncat
strncmp
**字符串查找**
strstr
strtok
**错误信息报告**
strerror
**字符操作**
**内存操作函数**
memcpy
memmove
memset
memcmp

> C语言中对字符和字符串的处理很是频繁，但是C语言本身是没有`字符串类型`的，字符串通常放在`常量字符串`中
> 或者字符数组中。 字符串常量适用于那些对它`不做修改`的字符串函数.

------

### 字符串类函数

#### strlen

```c
size_t strlen ( const char * str );
```

- ​       字符串以'\0' 作为结束标志，strlen函数返回的是在字符串中'\0' 前面出现的字符个数（不包含'\0' )。
- ​       参数指向的字符串必须要以'\0' 结束。
- ​       注意函数的返回值为size_t，是无符号的（易错）

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <assert.h>

int my_strlen(const char* str)
{
	int count = 0;
	assert(str != NULL);

	while (*str != '\0')//while(*str)
	{
		count++;
		str++;
	}
	return count;
}

int main()
{
	//int len = strlen("abcdef");//6
	//char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' ,'\0'};//6
	////错误示范
	//char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' };//19--随机值
	//int len = strlen(arr);//19

	int len = my_strlen("abcdef");
	printf("%d\n", len);
	return 0;
}
````

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

//使用size_t  而不使用int会在使用上带来困难
size_t my_strlen(const char* str)
{
	int count = 0;
	assert(str != NULL);

	while (*str != '\0')//while(*str)
	{
		count++;
		str++;
	}
	return count;
}

//size_t == unsigned int
int main()
{
	//3     -     6 =      -3(无符号补码大于0)
	if (my_strlen("abc") - my_strlen("abcdef") > 0)
	{
		printf("大于0\n");
	}
	else
	{
		printf("小于0\n");
	}
	return 0;
}
```

#### strcpy

> 字符串复制
>
> strcpy把含有['\0'](https://baike.baidu.com/item/'\0'/9931274)结束符的字符串复制到另一个[地址空间](https://baike.baidu.com/item/地址空间)

```c
char* strcpy(char * destination, const char * source );
```

- Copies the C string pointed by source into the array pointed by destination, including the terminating null character (and stopping at that point)
- 源字符串必须以'\0' 结束。
- 会将源字符串中的'\0' 拷贝到目标空间。
- 目标空间必须足够大，以确保能存放源字符串。
- 目标空间必须可变。

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <assert.h>

char* my_strcpy(char* dest, const char*src)
{
	assert(dest != NULL);
	assert(src != NULL);
	char* ret = dest;
	//拷贝src指向的字符串到dest指向的空间，包含'\0'
	while (*dest++ = *src++)
	{
		;
	}
	//返回目的空间的起始地址
	return ret;
}

int main()
{
	char arr1[] = "abcdefghi";
	//错误示范
	//char *arr1 = "abcdefghi";//常量字符串不可改变
	//char arr2[] = { 'b', 'i', 't' };//\0未知
	char arr2[] = "bit";//4
	
	my_strcpy(arr1, arr2);
	printf("%s\n", arr1);
	return 0;
}
````

#### strcat

> 将两个字符串连接（拼接）起来。

```c
char * strcat ( char * destination, const char * source );
```

Appends a copy of the source string to the destination string. The terminating null character in destination is overwritten by the first character of source, and a null-character is included at the end of the new string formed by the concatenation of both in destination.

- 源字符串必须以'\0' 结束。
- 目标空间必须有足够的大，能容纳下源字符串的内容。
- 目标空间必须可修改。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char arr1[30] = "hel\0lo";
	char arr2[] = "world";
	strcat(arr1, arr2);
	printf("%s\n", arr1);
	return 0;
}
```

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <assert.h>

char* my_strcat(char*dest, const char*src)
{
	char* ret = dest;
	assert(dest != NULL);
	assert(src);

	//1.找到目标字符的\0
	while (*dest != '\0')
	{
		dest++;
	}
	//2.追加
	while (*dest++ = *src++)
	{
		;
	}
	return ret;
}

int main()
{
	char arr1[30] = "hello";
	char arr2[] = "world";
	my_strcat(arr1, arr2);
	printf("%s\n", arr1);
	return 0;
}
````

#### strcmp

> 两个字符串自左向右逐个字符相比（按 ASCII 值大小相比较），直到出现不同的字符或遇 **\0** 为止。

```c
int strcmp ( const char * str1, const char * str2 );
```

This function starts comparing the first character of each string. If they are equal to each other, it continues with the following pairs until the characters differ or until a terminating null-character is reached.

- **标准规定：**
  第一个字符串大于第二个字符串，则返回大于0的数字
  第一个字符串等于第二个字符串，则返回0
  第一个字符串小于第二个字符串，则返回小于0的数字

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	//VS2013
	//> 1
	//== 0
	//< -1

	//linux-gcc
	//> >0
	//== 0
	//< <0
	char* p1 = "qbc";//6
	char* p2 = "abc";//5

	//int ret = strcmp(p1, p2);
	//printf("%d\n", ret);
	if (strcmp(p1, p2)>0)
	{
		printf("p1>p2\n");
	}
	else if (strcmp(p1, p2) == 0)
	{
		printf("pa == p2\n");
	}
	else if (strcmp(p1, p2)<0)
	{
		printf("p1<p2\n");
	}
	return 0;
}
````

##### strcmp实现

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <assert.h>

//int my_strcmp(const char* str1, const char* str2)
//{
//	assert(str1 && str2);
//	//比较
//	while (*str1 == *str2)
//	{
//		if (*str1 == '\0')
//		{
//			return 0;//相等
//		}
//		str1++;
//		str2++;
//	}
//
//	if (*str1 > *str2)
//		return 1;//大于
//	else
//		return -1;//小于
//}


int my_strcmp(const char* str1, const char* str2)
{
	assert(str1 && str2);
	//比较
	while (*str1 == *str2)
	{
		if (*str1 == '\0')
		{
			return 0;//相等
		}
		str1++;
		str2++;
	}

	return (*str1 - *str2);
}

int main()
{
	char* p1 = "abcdef";
	char* p2 = "abcd";
	int ret = my_strcmp(p1, p2);
	printf("ret = %d\n", ret);

	return 0;
}
```

#### strncpy

> strncpy()用来复制字符串的前n个字符

```c
char * strncpy ( char * destination, const char * source, size_t num );
```

-  Copies the first num characters of source to destination. If the end of the source C string (which is signaled by a null-character) is found before num characters have been copied, destination is padded with zeros until a total of num characters have been written to it.
-  拷贝num个字符从源字符串到目标空间。
-  如果源字符串的长度小于num，则拷贝完源字符串之后，在目标的后边追加0，直到num个。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char arr1[10] = "abcdefgh";
	char arr2[] = "bit";
	
	strncpy(arr1, arr2, 6);
	return 0;
}
```

![](https://s1.imagehub.cc/images/2021/05/06/strncpy.png)

```c
char *my_strncpy(char *dest, const char *src, int count)
{
	assert(dest&&src);//检测参数是否为空指针
	while (count) //复制count个字符，循环count次  
	{
		*dest++ = *src++;
		/*
		*（dest ++） = *(source ++)等价于：
		*dest = *source;
		dest +=1;
		source += 1;
		*/
		count--;
	}

	if (*(dest) != '\0')
		*(dest + 1) = '\0';
	return dest;
}
```

🌐[strcpy()与strncpy()的区别](https://blog.csdn.net/qq_26093511/article/details/73338036)

#### strncat

> 在字符串的结尾追加n个字符。

```c
char * strncat ( char * destination, const char * source, size_t num );
```

- 将源的前num个字符附加到目标，再加上一个终止的空字符`\0`。

````c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main()
{
	char arr1[30] = "hello\0xxxxxxxxxxxxx";
	char arr2[] = "world";

	strncat(arr1, arr2, 3);
	printf("%s\n", arr1);

	return 0;
}
````

![strncat.png](https://s1.imagehub.cc/images/2021/05/06/strncat.png)

- 如果source中的C字符串的长度小于num，则仅返回到终止空字符为止的内容已复制。

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>


```

![strncate554d95e7bcf9335.png](https://s1.imagehub.cc/images/2021/05/06/strncate554d95e7bcf9335.png)

#### strncmp

> 比较到出现另个字符不一样或者一个字符串结束或者num个字符全部比较完。

````c
int strncmp ( const char * str1, const char * str2, size_t num );
````

```c
#define _CRT_SECURE_NO_WARNINGS 1

#include <stdio.h>
#include <string.h>

int main()
{
	//strncmp - 字符串比较
	const char* p1 = "abczdef";
	char* p2 =       "abcqwer";
	//int ret = strcmp(p1, p2);
	int ret = strncmp(p1, p2, 4);
	printf("%d\n", ret);
	
	return 0;
}
```

#### strstr

> 在字符串中查找第一次出现字符串的位置，不包含终止符 '\0'。

````c
char * strstr ( const char *, const char * );
````

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>

int main()
{
	char *p1 = "abcdef";
	char *p2 = "abc";//输出abcdef
	//char *p2 = "abch";//输出字符串不存在
	char* ret = strstr(p1, p2);

	if (ret == NULL)
	{
		printf("字符串不存在\n");
	}
	else
	{
		printf("%s\n", ret);
	}
	return 0;
}
````

```c
int main()
{
	char *p1 = "abcdefabcdef";
	char *p2 = "def";//输出defabcdef,即第一次匹配出现的地址
	char* ret = strstr(p1, p2);

	if (ret == NULL)
	{
		printf("字符串不存在\n");
	}
	else
	{
		printf("%s\n", ret);
	}
	return 0;
}
```

自定义实现

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>
#include <assert.h>

//还有KMP 算法
char* my_strstr(const char* p1, const char* p2)
{
	assert(p1 != NULL);//断言目标字符串不能为空
	assert(p2 != NULL);//断言源字符串不能为空
	char *s1 = NULL;
	char *s2 = NULL;
	char *cur = (char*)p1;
	if (*p2 == '\0')
	{
		//判断源字符串是否为空,如果为空则返回目标字符串
		return (char*)p1;//return值可自定义
	}
	while (*cur)
	{
		s1 = cur;
		s2 = (char*)p2;

		while (*s1 && *s2 && (*s1 == *s2))
		{
			s1++;
			s2++;
		}
		if (*s2 == '\0')
		{
			return cur;//找到子串
		}
		if (*s1 == '\0')//目标字符串寻找完成,但未找到
		{
			return NULL;
		}
		cur++;
	}
	return NULL;//找不到子串
}

int main()
{
	char *p1 = "abcccdcdef";//目标字符串
	char *p2 = "ccd";//源字符串

	char* ret = my_strstr(p1, p2);

	if (ret == NULL)
	{
		printf("子串不存在\n");
	}
	else
	{
		printf("%s\n", ret);
	}
	return 0;
}
```

#### strtok

> 将字符串分割成一个个片段。

```c
char * strtok ( char * str, const char * sep );
```

- sep参数是个字符串，定义了用作分隔符的字符集合
- 第一个参数指定一个字符串，它包含了0个或者多个由sep字符串中一个或者多个分隔符分割的标记。
- strtok函数找到str中的下一个标记，并将其用\0 结尾，返回一个指向这个标记的指针。（注：strtok函数会改变被操作的字符串，所以在使用strtok函数切分的字符串一般都是临时拷贝的内容并且可修改。）
- strtok函数的第一个参数不为NULL ，函数将找到str中第一个标记，<font style="color:orange;">strtok函数将保存它在字符串中的位置。</font>
- strtok函数的第一个参数为NULL ，函数将在同一个字符串中被保存的位置开始，查找下一个标记。
- 如果字符串中不存在更多的标记，则返回NULL 指针。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>

int main()
{
	//192.168.31.121   .
	//192 168 31 121 - strtok
	//zpw@bitedu.tech   @.
	//zpw bitedu tech - strtok
	
  //点分十进制的表示方式
	//char arr[] = "123@234.@234";
	//char*p = ".@";
  
	char arr[] = "zpw@bitedu.tech";
	char*p = "@.";

	//buf中存储的字符串:zpw\0bitedu.tech
	char buf[1024] = { 0 };
	strcpy(buf, arr);

	//切割buf中的字符串
	char*ret = strtok(arr, p);
	printf("%s\n", ret);//zpw

	//buf中存储的字符串:bitedu\0tech
	ret = strtok(NULL, p);
	printf("%s\n", ret);//bitedu

	ret = strtok(NULL, p);
	printf("%s\n", ret);//tech

	return 0;
}
````

##### 改进

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>

int main()
{
	//192.168.31.121   .
	//192 168 31 121 - strtok
	//zpw@bitedu.tech   @.
	//zpw bitedu tech - strtok
	
	char arr[] = "zpw@bitedu.tech";
	char*p = "@.";


	//buf中存储的字符串:zpw\0bitedu.tech
	char buf[1024] = { 0 };
	strcpy(buf, arr);

	char* ret = NULL;
	for (ret = strtok(arr, p); ret != NULL; ret=strtok(NULL, p))
	{
		printf("%s ", ret);
	}
	return 0;
}
````

#### strerror

> 返回错误码，所对应的错误信息。

```c
char * strerror ( int errnum );
```

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>
#include <errno.h>//必须包含的头文件

int main()
{
	//错误码  错误信息
	//0 -     No error
	//1 -     Operation not permitted
	//2 -     No such file or directory
	//...
	//errno 是一个全局的错误码的变量
	//当C语言的库函数在执行过程中，发生了错误，就会把对应的错误码，赋值到errno中

	//char*str = strerror(0);
	//printf("%s\n", str);

	//char*str = strerror(errno);
	//printf("%s\n", str);

	//打开文件
	FILE* pf = fopen("test.txt", "r");//r-read 只读

	if (pf == NULL)
	{
		printf("%s\n", strerror(errno));
	}
	else
	{
		printf("open file success\n");//同一工程文件目录下新建这个文件就会输出这个
	}

	return 0;
}
```

#### 字符分类函数：

| **函数** | **如果他的参数符合下列条件就返回真**                         |
| -------- | ------------------------------------------------------------ |
| iscntrl  | 任何控制字符                                                 |
| isspace  | 空白字符：空格‘ ’，换页‘\f’，换行'\n'，回车‘\r’，制表符'\t'或者垂直制表符'\v' |
| isdigit  | 十进制数字 0~9                                               |
| isxdigit | 十六进制数字，包括所有十进制数字，小写字母a~f，大写字母A~F   |
| islower  | 小写字母a~z                                                  |
| isupper  | 大写字母A~Z                                                  |
| isalpha  | 字母a~z或A~Z                                                 |
| isalnum  | 字母或者数字，a~z,A~Z,0~9                                    |
| ispunct  | 标点符号，任何不属于数字或者字母的图形字符（可打印）         |
| isgraph  | 任何图形字符                                                 |
| isprint  | 任何可打印字符，包括图形字符和空白字符                       |

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main()
{
	//char ch = '2';
	////int ret = islower(ch);
	//int ret = isdigit(ch);
	//printf("%d\n", ret);

	//char ch = tolower('q');
	//char ch = toupper('q');
	//putchar(ch);
	char arr[] = "I Am A Student";
	int i = 0;
	while (arr[i])
	{
		if (isupper(arr[i]))
		{
			arr[i] = tolower(arr[i]);
		}
		i++;
	}
	printf("%s\n", arr);
	return 0;
}
```

### 内存操作函数

不局限于前面只能操作字符串的函数,还能处理浮点型,整型等等

#### memcpy

> 内存拷贝

```c
void * memcpy ( void * destination, const void * source, size_t num );
```

- 函数memcpy从source的位置开始向后复制num个字节的数据到destination的内存位置。
- 这个函数在遇到'\0' 的时候并不会停下来。
- 如果source和destination有任何的重叠，复制的结果都是未定义的。

```c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>
int main()
{
	int arr1[] = { 1, 2, 3, 4, 5 };
	int arr2[5] = { 0 };
	memcpy(arr2, arr1, sizeof(arr1));
	return 0;
}
```

![memcpy.png](https://i.loli.net/2021/05/07/qTrHt6o5YUzlSfv.png)

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>

int main()
{
	int arr1[] = { 1, 2, 3, 4, 5};
	int arr2[5] = { 0 };

	struct S arr3[] = { { "张三", 20 }, { "李四", 30 } };
	struct S arr4[3] = {0};
	memcpy(arr4, arr3, sizeof(arr3));

	return 0;
}
````

![memcpy1.png](https://i.loli.net/2021/05/07/7QyGUtZljJ8bMde.png)

##### 自定义实现

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>
#include <assert.h>

struct S
{
	char name[20];
	int age;
};

void* my_memcpy(void* dest, const void* src, size_t num)
{
	void* ret = dest;
	assert(dest != NULL);
	assert(src != NULL);

	while (num--)
	{
		*(char*)dest = *(char*)src;
		++(char*)dest;
		++(char*)src;
	}

	return ret;
}

int main()
{
	int arr1[] = { 1, 2, 3, 4, 5};
	int arr2[5] = { 0 };

	struct S arr3[] = { { "张三", 20 }, { "李四", 30 } };
	struct S arr4[3] = {0};

	//my_memcpy(arr4, arr3, sizeof(arr3));
	my_memcpy(arr2, arr1, sizeof(arr1));
	return 0;
}
````

#### memmove

> 内存拷贝

````c
void * memmove ( void * destination, const void * source, size_t num );
````

- 和memcpy的差别就是memmove函数处理的源内存块和目标内存块是可以重叠的。
- 如果源空间和目标空间出现重叠，就得使用memmove函数处理。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdio.h>
#include <string.h>

int main()
{
	// 1  2  1  2  3  4  5  8  9  10
	int arr3[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

	//memmove可以胜任内存的重叠拷贝
	memmove(arr3+2, arr3, 20);
	//C语言标准：memcpy函数可以拷贝不重叠的就可以了
	//当下发现：VS2013环境下的memcpy可以处理重叠拷贝
	memcpy(arr3+2, arr3, 20);

	return 0;
}
````

##### 自定义实现

```c
#define _CRT_SECURE_NO_WARNINGS 1

#include <stdio.h>
#include <string.h>
#include <assert.h>

//void* my_memcpy(void* dest, const void* src, size_t count)
//{
//	char* ret = dest;
//	assert(dest != NULL);
//	assert(src != NULL);
//
//	while (count--)
//	{
//		*(char*)dest = *(char*)src;
//		++(char*)dest;
//		++(char*)src;
//	}
//	return ret;
//}

//void* my_memmove(void* dest, const void*src, size_t count)
//{
//	void* ret = dest;
//	assert(dest != NULL);
//	assert(src != NULL);
//	if (dest<src || dest>(char*)src + count)
//	{
//		//前->后
//	}
//	else
//	{
//		//后->前
//	}
//	
//	return ret;
//}

void* my_memmove(void* dest, const void*src, size_t count)
{
	void* ret = dest;
	assert(dest != NULL);
	assert(src != NULL);
	if (dest < src)
	{
		//前->后
		while (count--)
		{
			*(char*)dest = *(char*)src;
			++(char*)dest;
			++(char*)src;
		}
	}
	else
	{
		//后->前
		while (count--)
		{
			*((char*)dest + count) = *((char*)src + count);
		}
	}

	return ret;
}


int main()
{
	//int arr1[] = { 1, 2, 3, 4, 5 };
	//int arr2[10] = { 0 };
	//arr1中的数字拷贝到arr2中
	//my_memcpy(arr2, arr1, sizeof(arr1));
	// 1  2  1  2  3  4  5  8  9  10
	int arr3[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

	my_memmove(arr3, arr3 + 2, 20);
  
	//my_memcpy不能胜任重叠拷贝的
	//my_memcpy(arr3+2, arr3, 20);

	//memmove可以胜任内存的重叠拷贝
	//memmove(arr3+2, arr3, 20);
	//C语言标准说：memcpy函数可以拷贝不重叠的就可以了
	//当下发现：VS2013环境下的memcpy可以处理重叠拷贝
	//memcpy(arr3+2, arr3, 20);

	return 0;
}
```

#### memcmp

> 内存大小比较

```c
int memcmp ( const void * ptr1,  const void * ptr2, size_t num );
```

- 比较从ptr1和ptr2指针开始的num个字节

- 返回值如下：

  若参数ptr1 和ptr 2 所指的内存内容都完全相同则返回0 值。ptr 1 若大于ptr2 则返回大于0 的值。ptr1 若小于ptr2 则返回小于0 的值。

```c
#define _CRT_SECURE_NO_WARNINGS 1

#include <string.h>
#include <stdio.h>

int main()
{
	//01 00 00 00 02 00 00 00 03 00 00 00 ...
	//01 00 00 00 02 00 00 00 05 00 00 00 ...
	int arr1[] = { 1, 2, 3, 4, 5 };
	int arr2[] = { 1, 2, 5, 4, 3 };

	int ret = memcmp(arr1, arr2, 9);

	printf("%d\n", ret);

	return 0;
}
```

#### memset 

> 内存设置 初始化内存

```c
void *memset(void *str, int c, size_t n)
```

- 将指针变量 s 所指向的前 n 字节的内存单元用一个“整数” c 替换，注意 c 是 int 型。s 是 void* 型的指针变量，所以它可以为任何类型的数据进行初始化。

参数

- **str** -- 指向要填充的内存块。
- **c** -- 要被设置的值。该值以 int 形式传递，但是函数在填充内存块时是使用该值的无符号字符形式。
- **n** -- 要被设置为该值的字符数。

````c
#define _CRT_SECURE_NO_WARNINGS 1
#include <string.h>

int main()
{
	//char arr[10] = "";
	//memset(arr, '#', 10);

	int arr[10] = { 0 };
	//40 个字节
	//01 01 01 01 01 01 01 01 01 01 00 00 00 00 00 ...
	memset(arr, 1, 10);//这里的10改的是10个字节

	return 0;
}
````

