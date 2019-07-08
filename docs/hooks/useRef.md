# useRef
## useRef使用场景
- **获取子组件或者DOM节点的句柄**
- **类似于一个 class 的实例属性，渲染周期之间共享数据的存储**

```js
import React, { useState, useRef, useEffect } from 'react'

function TextInputWithFocusButton() {
  const [count, setCount] = useState(0)
  const inputEl = useRef(null)
  const intervalRef = useRef()

  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    console.log(inputEl.current)
    inputEl.current.focus()
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 5) {
      clearInterval(intervalRef.current)
    }
  })
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
      {count}
    </>
  );
}

export default TextInputWithFocusButton
```