# useMemo
useMemo是一种性能优化的手段，useMemo接收两个参数，一个函数和一个依赖项数组，它仅会在某个依赖项改变时才重新执行函数中的逻辑，这种优化有助于避免在每次渲染时都进行高开销的计算
## 执行时机
- **useMemo是在渲染期间执行**
- **如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值**

## useMemo示例
```js
import React, { useState, useMemo, useCallback, memo } from 'react'

const Foo = memo(function Foo(props) {
  console.log('渲染了')
  return (
    <>
      <div onClick={props.click}>Foo:{props.count}</div>
    </>
  )
})

function App() {
  const [count, setCount] = useState(0)
  const [age, setAge] = useState(18)
  const [size, setSize] = useState(18)

  const double = useMemo(() => {
    console.log('useMemo执行了')
    return count * 2
  }, [count])

  // const click = () => {
  //   console.log('click')
  // }

  // const click = useMemo(() => {
  //   return () => {
  //     console.log('click')
  //   }
  // }, [])
  
  // useMemo(() => fn) === useCallback(fn)
  const click = useCallback(() => {
    console.log('click')
    setSize(size + 1)
  }, [size])
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>change count</button>
      <button onClick={() => setAge(age + 1)}>change age</button>
      <div>age: {age}</div>
      <div>count: {count}</div>
      <div>double: {double}</div>
      <div>size: {size}</div>
      <Foo count={count} click={click}/>
    </>
  )
}

export default App
```

## useCallback

```js
const click = useCallback(() => {
  console.log('click')
  setSize(size + 1)
}, [size])
```
useCallback接收两个参数，一个内联回调函数，一个依赖项数组，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。

```js
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
```