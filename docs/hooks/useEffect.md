# useEffect

- **useEffect 可以让你在函数组件中执行副作用操作**  
以前我们写一个有状态组件时，通常会产生很多的副作用，比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等。我们之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。

### 参数
useEffect方法接收传入两个参数：
- 1.回调函数：在第组件一次render和之后的每次update后运行，React保证在DOM已经更新完成之后才会运行回调。  
- 2.状态依赖(数组)：当配置了状态依赖项后，只有检测到配置的状态变化时，才会调用回调函数。
```js
useEffect(() => {
  // 只要组件render后就会执行
});
useEffect(() => {
  // 只有count改变时才会执行
},[count]);
```

## useEffect示例
```js
import React, { useState, useEffect } from 'react'

function App() {
  // 多个useState, useEffect关注点分离
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  
  // 不传数组useEffect每次都会执行
  useEffect(() => {
    document.title = count
  })

  // 传空数组useEffect只执行一次
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  // 数组中传入count，只有count的变化才会执行副作用，size的变化不会执行
  useEffect(() => {
    console.log('count-----', count)
  }, [count])
  
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  return (
    <>
      <button onClick={() => {setCount(count + 1)}}>change</button>
      {count}<br/>
      {size.width}---{size.height}
    </>
  );
}

export default App
```

## 注意点
- **关注点分离**  
将彼此独立的逻辑写在各自的useEffect中
- **清除副作用**  
useEffect的第一个参数可以返回一个函数，在函数中执行清除操作  
`注意：`这种解绑的模式跟componentWillUnmount不一样。componentWillUnmount只会在组件被销毁前执行一次而已，而useEffect里的函数，每次页面执行下一次更新后, 执行下一次useEffect之前,会先执行上一个useEffect第一个参数返回的函数来清除副作用
- **控制副作用执行时机**  
通过useEffect函数的第二个参数`[]`，传递的值来控制useEffect是否执行

## 生命周期模拟
```js
import React, { useEffect, useRef, useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    // componentDidMount
    return () => {
      // componentWillUnmount
    }
  }, [])

  const init = useRef(true)
  useEffect(() => {
    if (init.current) {
      init.current = false;
    } else {
      // componentDidUpdate
    }
  })

  return (
    <>
      <button onClick={() => setCount(count + 1)}>change</button>
      <div>{count}</div>
    </>
  )
}

export default App
```



