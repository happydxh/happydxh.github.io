# useState

`useState`是react自带的一个hook函数，它的作用就是用来声明状态变量。 useState这个函数接收的参数是我们的状态初始值（initial state），它返回了一个数组，这个数组的第 `[0]`项是当前当前的状态值，第 `[1]`项是可以改变状态值的方法函数

## useState示例

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 等价的class示例

```js
import React from 'react';
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

## 使用多个state变量

```js
const [count, setCount] = useState(0);
const [age, setAge] = useState(18);
const [fruit, setFruit] = useState('banana');
```

## 初始值可以是任意类型
```js
const [count, setCount] = useState(0);
const [size], setAge] = useState({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
});
const [arr, setArr] = useState(['banana', 'apple']);
const [bool, setBool] = useState(true);
```
                                                                          

