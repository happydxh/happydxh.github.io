# useContext

## useContext 示例

### 使用步骤
- 创建MyContext  
- 使用`MyContext.Provider`提供value  
- hooks组件中使用`useContext(MyContext)`获得数值value  
- class组件中使用`MyContext.Consumer`或`contextType`获取数值value

```js
import React, { useState, createContext, useContext } from 'react'

const MyContext = createContext();

// hooks
function Counter() {
  let count = useContext(MyContext);
  return (
    <>
      <div>Counter: {count}</div>
    </>
  )
}

// 类组件通过MyContext.Consumer获取值
class Foo extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {
          count => (
            <div>Foo:{count}</div>
          )
        }
      </MyContext.Consumer>
    )
  }
}

// 类组件通过contextType和this.context获取值
class Bar extends React.Component {
  static contextType = MyContext
  render() {
    const count = this.context
    return (
      <div>Bar:{count}</div>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => {setCount(count + 1)}}>click</button>
      <div>App: {count}</div>
      <MyContext.Provider value={count}>
        <Counter />
        <Foo/>
        <Bar/>
      </MyContext.Provider>
    </>
  )
}

export default App
```