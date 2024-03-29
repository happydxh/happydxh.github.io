# Hooks简介
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。使用函数的情况下也可以编写有状态组件

## 没有破坏性改动

- **完全可选的**  
你无需改写以前的类组件代码，只需在新的组件中去尝试 Hook，Hook 和现有代码可以同时工作，你可以渐进式地使用他们

- **100% 向后兼容的**  
Hook 不包含任何破坏性改动

- **现在可用**  
Hook 已发布于 v16.8.0

## 动机
- **在组件之间复用状态逻辑很难**  
现有的方案有render props和高阶组件， 但是这类方案需要重新调整你的代码结构， 另外dom的嵌套层级会增加
- **复杂组件变得难以理解**  
每个生命周期常常包含一些不相关的逻辑，同时去设置事件监听、调用各种接口、初始化等等
- **难以理解的 class**  
class类增加学习成本，需要手动处理this问题

