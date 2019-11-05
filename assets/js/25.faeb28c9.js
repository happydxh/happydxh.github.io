(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{233:function(t,n,s){"use strict";s.r(n);var a=s(2),e=Object(a.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"什么是执行上下文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是执行上下文"}},[t._v("#")]),t._v(" 什么是执行上下文")]),t._v(" "),s("p",[t._v("执行上下文是评估和执行 JavaScript 代码的环境的抽象概念，可以理解为当前代码的执行环境。")]),t._v(" "),s("h2",{attrs:{id:"执行上下文的类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行上下文的类型"}},[t._v("#")]),t._v(" 执行上下文的类型")]),t._v(" "),s("ul",[s("li",[s("p",[s("strong",[t._v("全局执行上下文")]),s("br"),t._v("\nJavaScript代码运行起来会首先进入该环境,一个程序中只会有一个全局执行上下文。")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("函数执行上下文")]),s("br"),t._v("\n每当一个函数被调用时, 都会为该函数创建一个新的上下文。")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("Eval 函数执行上下文")]),s("br"),t._v("\n执行在 eval 函数内部的代码也会有它属于自己的执行上下文。")])])]),t._v(" "),s("h2",{attrs:{id:"执行上下文栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行上下文栈"}},[t._v("#")]),t._v(" 执行上下文栈")]),t._v(" "),s("p",[t._v("在函数上下文中我们知道，每当一个函数被调用时, 都会为该函数创建一个新的上下文，那JavaScript是如何来管理这些上下文的？")]),t._v(" "),s("p",[t._v("答案是"),s("code",[t._v("执行上下文栈")]),t._v("，JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理这些执行上下文。")]),t._v(" "),s("p",[s("code",[t._v("执行上下文栈")]),t._v("是一种拥有 LIFO（后进先出）数据结构的栈")]),t._v(" "),s("p",[t._v("当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部，压入的过程类似于数组的"),s("code",[t._v("push")]),t._v("。")]),t._v(" "),s("p",[t._v("引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文，弹出的过程类似于数组的"),s("code",[t._v("pop")]),t._v("。")]),t._v(" "),s("p",[s("strong",[t._v("让我们通过下面的代码示例来理解")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("one")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Inside one function'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("two")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Again inside one function'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("two")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Inside two function'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("one")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Inside Global Execution Context'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("img",{attrs:{src:t.$withBase("/context.jpeg"),alt:"context"}}),t._v(" "),s("blockquote",[s("p",[t._v("当上述代码在浏览器加载时，JavaScript 引擎创建了一个全局执行上下文并把它压入当前执行栈。当遇到 one() 函数调用时，JavaScript 引擎为该函数创建一个新的执行上下文并把它压入当前执行栈的顶部。")])]),t._v(" "),s("blockquote",[s("p",[t._v("当从 one() 函数内部调用 two() 函数时，JavaScript 引擎为 two() 函数创建了一个新的执行上下文并把它压入当前执行栈的顶部。当 two() 函数执行完毕，它的执行上下文会从当前栈弹出，并且控制流程到达下一个执行上下文，即 one() 函数的执行上下文。")])]),t._v(" "),s("blockquote",[s("p",[t._v("当 one() 执行完毕，它的执行上下文从栈弹出，控制流程到达全局执行上下文。一旦所有代码执行完毕，JavaScript 引擎从当前栈中移除全局执行上下文。")])])])}),[],!1,null,null,null);n.default=e.exports}}]);