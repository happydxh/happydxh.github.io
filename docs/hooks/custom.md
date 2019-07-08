# 自定义Hook
通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。  
以下提供了自定义hooks、高阶组件、Render Props三种重用逻辑方式的示例进去比较


## 自定义hook
```js
import React, { useState, useEffect } from 'react'

// 自定义hooks
function useResize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  // 传空数组useEffect只执行一次
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  return size
}

function App () {
  let size = useResize();
  return (
    <>
      <h1>移动鼠标!</h1>
      <div>{size.width} {size.height}</div>
    </>
  )
}

export default App
```

### 自定义hooks注意事项
- **自定义 Hook 必须以 use 开头**  
- **在两个组件中使用相同的Hook不会共享state**  
自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

## HOC
```js
import React from "react";

const wrapResize = (WrapComponent) => {
  return class Resize extends React.Component {
    constructor(props) {
      super(props);
      this.getClient = this.getClient.bind(this);
      this.state = { 
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }
  
    componentDidMount() {
      window.addEventListener('resize', this.getClient, false)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.getClient, false)
    }
  
    getClient() {
      this.setState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }
  
    render() {
      const { width, height } = this.state
      return (
        <>
          <WrapComponent width={width} height={height}/>
        </>
      );
    }
  }
}

class App extends React.Component {
  render() {
    const { width, height } = this.props
    return (
      <>
        <h1>移动鼠标!</h1>
        <div>{width} {height}</div>
      </>
    );
  }
}

export default wrapResize(App)
```

## Render Props
```js
import React from "react";

class Resize extends React.Component {
  constructor(props) {
    super(props);
    this.getClient = this.getClient.bind(this);
    this.state = { 
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.getClient, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getClient, false)
  }

  getClient() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  render() {
    return (
      <>
        {/* 组件中实现逻辑，并把值传递出去，调用改组件是可以拿到该组件传递过去的值，并在render函数中编写UI，类似solt */}
        {this.props.render(this.state)}
      </>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <h1>移动鼠标!</h1>
        <Resize render={size => (
          <div>{size.width} {size.height}</div>
        )}/>
      </>
    );
  }
}

export default App
```

**对比发现，自定义hooks复用逻辑更简单，并且可以避免不必要的嵌套层级**
