---
title: "js执行上下文"
date: "2019-07-09"
permalink: "2019-07-09-js-context"
---

## 什么是执行上下文
执行上下文是评估和执行 JavaScript 代码的环境的抽象概念，可以理解为当前代码的执行环境。

## 执行上下文的类型
- **全局执行上下文**  
JavaScript代码运行起来会首先进入该环境,一个程序中只会有一个全局执行上下文。

- **函数执行上下文**  
 每当一个函数被调用时, 都会为该函数创建一个新的上下文。

- **Eval 函数执行上下文**  
执行在 eval 函数内部的代码也会有它属于自己的执行上下文。

## 执行上下文栈
在函数上下文中我们知道，每当一个函数被调用时, 都会为该函数创建一个新的上下文，那JavaScript是如何来管理这些上下文的？  

答案是`执行上下文栈`，JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理这些执行上下文。  

`执行上下文栈`是一种拥有 LIFO（后进先出）数据结构的栈  

当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部，压入的过程类似于数组的`push`。   

引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文，弹出的过程类似于数组的`pop`。     

**让我们通过下面的代码示例来理解**

```js
let a = 'hello';

function one() {
  console.log('Inside one function');
  two();
  console.log('Again inside one function');
}

function two() {
  console.log('Inside two function');
}

one();
console.log('Inside Global Execution Context');
```

<img :src="$withBase('/context.jpeg')" alt="context">

>当上述代码在浏览器加载时，JavaScript 引擎创建了一个全局执行上下文并把它压入当前执行栈。当遇到 one() 函数调用时，JavaScript 引擎为该函数创建一个新的执行上下文并把它压入当前执行栈的顶部。  

>当从 one() 函数内部调用 two() 函数时，JavaScript 引擎为 two() 函数创建了一个新的执行上下文并把它压入当前执行栈的顶部。当 two() 函数执行完毕，它的执行上下文会从当前栈弹出，并且控制流程到达下一个执行上下文，即 one() 函数的执行上下文。  

>当 one() 执行完毕，它的执行上下文从栈弹出，控制流程到达全局执行上下文。一旦所有代码执行完毕，JavaScript 引擎从当前栈中移除全局执行上下文。