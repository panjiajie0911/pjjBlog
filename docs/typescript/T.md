<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-12-11 11:33:26
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-12-12 11:20:49
 * @FilePath: \pjjBlog\docs\typescript\T.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEh
-->

# 类型变量

**_类型变量 T_** 是 typescript 中新增的一个概念，用来表示某个位置类型的变量。

你可以简单地把它理解为 f(x)中的 自变量 X，你可以把 x 设置成 number 类型，又可以把 X 设置成 string 类型，甚至可以设置成其他类型，完全根据需要来。

类型变量 T 的一个重要用途是泛型，当一个 function 引入了变量类型 T，这个 function 就是**_泛型函数_**。

下面这个就是一个举例：

```typescript
const func = function <T>(arg: T): T {
  return arg;
};
```

在上面的这个函数中，添加了类型变量 T。

T 帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。

之后我们再次使用了 T 当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。

## 泛型函数

在我们已经声明了一个泛型函数 func 的时候，如下

```typescript
const func = function <T>(arg: T): T {
  return arg;
};
```

那么，我们可以使用不同的泛型参数名，只要在数量上和使用方式上做出对应。

```typescript
const myIdentity: <T>(arg: T) => T = func;
```

## 泛型类

泛型类同样使用 T 作为类型变量

```typescript
class GenericNumber<T> {
  value: T;
  add: (x: T, y: T) => T;
}
```

在上面这个泛型类中，在实例化的过程中，一旦制定了类型，此后的实例的值和函数，都要保持一致的类型

```typescript
const instance = new GenericNumber<number>();
instance.value = 1; // 只能是number
instance.add = (x: number, y: number) => x + y; // 只能是number
```
