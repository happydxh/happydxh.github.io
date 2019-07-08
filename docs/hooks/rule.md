# Hook规则
## 只在最顶层使用Hook
`不要在循环，条件或嵌套函数中调用 Hook`， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

## 只在React函数中调用Hook
- **在 React 的函数组件中调用 Hook**  
- **在自定义 Hook 中调用其他 Hook**  

## ESLint 插件
使用ESLint 插件强制遵守这两条规则

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```bash
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```