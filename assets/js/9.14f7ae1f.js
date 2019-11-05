(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{216:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"hook规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hook规则"}},[s._v("#")]),s._v(" Hook规则")]),s._v(" "),a("h2",{attrs:{id:"只在最顶层使用hook"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#只在最顶层使用hook"}},[s._v("#")]),s._v(" 只在最顶层使用Hook")]),s._v(" "),a("p",[a("code",[s._v("不要在循环，条件或嵌套函数中调用 Hook")]),s._v("， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。")]),s._v(" "),a("h2",{attrs:{id:"只在react函数中调用hook"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#只在react函数中调用hook"}},[s._v("#")]),s._v(" 只在React函数中调用Hook")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("在 React 的函数组件中调用 Hook")])]),s._v(" "),a("li",[a("strong",[s._v("在自定义 Hook 中调用其他 Hook")])])]),s._v(" "),a("h2",{attrs:{id:"eslint-插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#eslint-插件"}},[s._v("#")]),s._v(" ESLint 插件")]),s._v(" "),a("p",[s._v("使用ESLint 插件强制遵守这两条规则")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" eslint-plugin-react-hooks --save-dev\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("// 你的 ESLint 配置\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"plugins"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    // "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"react-hooks"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"rules"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    // "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"react-hooks/rules-of-hooks"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"error"')]),s._v(", // 检查 Hook 的规则\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"react-hooks/exhaustive-deps"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"warn"')]),s._v(" // 检查 effect 的依赖\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);