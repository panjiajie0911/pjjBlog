<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-12-17 15:48:34
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-12-18 14:14:55
 * @FilePath: \pjjBlog\docs\typescript\type.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 高级类型

## 联合类型

```typescript
interface A {
  name: string;
  id: number;
}

interface B {
  name: string;
  id: string;
}
```

在以上的连个 interface 中，我们可以通过联合类型，把他们合并成一个类型

```typescript
function fn(arg: A | B) {
  if (typeof arg.id === "number") {
    console.log(arg.id);
  } else {
    console.log(arg.id);
  }
}
```

这个函数的入参，就是 A 和 B 的联合类型，同时，如果是&操作符，那么会把 A 和 B 的属性合并成一个类型，就是交叉类型

```typescript
function fn(arg: A & B) {
  console.log(arg.id);
}
```

但是这里需要注意

- id 属性是 A 和 B 中都有的属性，所以这里 id 会被声明为 never;

## 内置高级类型

还有一种特殊，就是我们在 inteface 中，我们只需要基础的类型的部分属性，为了避免重复声明，我们就使用 typescript 的内置高级类型。

```typescript
interface A {
  name: string;
  id: number;
  age: number;
}
interface B {
  name: string;
}

// 让A的所有属性可选
interface B extends Partial<A> {
  name: string;
}

// 让A的所有属性只读
interface C extends Readonly<A> {
  name: string;
}

// 让A的所有属性必选
interface D extends Required<A> {
  name: string;
}

// 从A的属性中，选择部分属性
interface E extends Pick<A, "name" | "id"> {
  name: string;
}

// 从A的属性中，排除部分属性
interface F extends Omit<A, "name" | "id"> {
  name: string;
}

// 从A（联合类型）中排除B
interface G extends Exclude<A | B, B> {
  name: string;
}

// 从A（联合类型）中提取B
interface H extends Extract<A | B, B> {
  name: string;
}

// 从A中定义一个对象，这个对象的key是K，值是V
interface I extends Record<string, number> {
  name: string;
}
```
