# hooks实现

## useState实现
```js
import  React from 'react';
import ReactDOM from 'react-dom';
let memoizedState;
function useState(initialState){
  memoizedState = memoizedState || initialState;
  function setState(newState){
    memoizedState = newState;
    render();
  }
  return [memoizedState, setState];
}
function Counter(){
  //useState就是一个hooks
  //第一个是当前的状态，第二个是改变状态的函数
  //核心作用是给函数组件增加了一个保持状态的功能
  const [number,setNumber] = useState(0);//参数是初始状态
  return (
    <>
      <p>{number}</p>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </>
  )
}
function render(){
  ReactDOM.render(<Counter/>,document.getElementById('root'));
}
render();
```

## useReducer实现
```js
import  React from 'react';
import ReactDOM from 'react-dom';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

let initalArg = 0;
function init(initalArg){
  return {number:initalArg};
}

function reducer(state, action){
  switch(action.type){
    case INCREMENT:
      return {number:state.number+1};
    case DECREMENT:
      return {number:state.number-1};   
    default:
      return state;   
  }
}

let memoizedState;
function useReducer(reducer,initalArg,init){
  let initialState = void 0;
  if(typeof init  != 'undefined'){
    initialState = init(initalArg);
  }else{
    initialState = initalArg;
  }
  function dispatch(action){
    memoizedState = reducer(memoizedState, action);
    render();
  }
  memoizedState = memoizedState || initialState;
  return [memoizedState, dispatch];
}

function Counter(){
  // state={number:0}
  let [state,dispatch] = useReducer(reducer, initalArg, init);
  return (
    <>
      <p>{state.number}</p>
      <button onClick={()=>dispatch({type:INCREMENT})}>+</button>
      <button onClick={()=>dispatch({type:DECREMENT})}>-</button>
    </>
  )
}
function render(){
  ReactDOM.render(<Counter/>,document.getElementById('root'));
}
render();
```

## 使用useReducer实现useState
useReducer是useState 的内部实现
```js
import React from 'react';
import ReactDOM from 'react-dom';

let memoizedState;
function useReducer(reducer, initalArg, init) {
  let initialState = void 0;
  if (typeof init != 'undefined') {
    initialState = init(initalArg);
  } else {
    initialState = initalArg;
  }
  function dispatch(action) {
    memoizedState = reducer(memoizedState, action);
    render();
  }
  memoizedState = memoizedState || initialState;
  return [memoizedState, dispatch];
}
// useReducer是useState 的内部实现
function useState(initialState) {
  function reducer(oldState, newState){
    return newState
  }
  // return useReducer((oldState, newState) => newState, initialState);
  return useReducer(reducer, initialState);
}
function Counter() {
  //useState就是一个hooks
  //第一个是当前的状态，第二个是改变状态的函数
  const [number, setNumber] = useState(0); //参数是初始状态
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  );
}
function render() {
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
render();

```

## 多个useState实现
通过多个useState实现方式，可以知道，因为索引的原因，Hook不能在循环，条件或嵌套函数中调用
```js
import  React from 'react';
import ReactDOM from 'react-dom';
let memoizedStates=[];
let index = 0;
function useState(initialState){
  memoizedStates[index] = memoizedStates[index] || initialState;
  let currentIndex = index;
  function setState(newState) {
    memoizedStates[currentIndex] = newState;
  }
  return [memoizedStates[index++], setState];
}
function Counter(){
  /**
    第一轮的时候memoizedStates=['计数器']
    第二轮的时候memoizedStates=['计数器', 0]
  */
  const [name,setName] = useState('计数器');
  const [number,setNumber] = useState(0);
  return (
    <>
      <p>{name}:{number}</p>
      <button onClick={()=>setName('计数器'+Date.now())}>改名称</button>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </>
  )
}
function render(){
  index = 0;
  ReactDOM.render(<Counter/>,document.getElementById('root'));
}
render();
```

## useEffect实现
```js
import React from 'react'
import ReactDOM from 'react-dom'
// 渲染完成后 memoizedStates = ['计数器', 0, [0], ['计数器', 0]]
// 数组中的四个值，前两个是useState传进去的，后面两个是useEffect依赖项数组传进去的
let memoizedStates = []
let index = 0
function useState(initialState) {
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index
  function setState(newState) {
    memoizedStates[currentIndex] = newState
    render()
  }
  return [memoizedStates[index++], setState]
}

function useEffect(callback, dependencies) {
  if (!dependencies) {
    index++
    return callback()
  }

  let lastDependencies = memoizedStates[index]
  console.log(memoizedStates)
  // every每一项为true则返回true
  // useEffect传入的[]中的值与当前的lastDependencies中的值做比较，有一个不同就需要执行callback
  let changed = lastDependencies
    ? !dependencies.every((item, index) => item === lastDependencies[index])
    : true
  if (changed) {
    callback()
    memoizedStates[index] = dependencies
  }
  index++
}

function Counter() {
  const [name, setName] = useState('计数器') // 0
  const [number, setNumber] = useState(0) // 1
  useEffect(() => {
    console.log('number1:', number) // 2
  }, [number])
  useEffect(() => {
    console.log('number2:', number) // 3
  }, [name, number])
  return (
    <>
      <p>
        {name}:{number}
      </p>
      <button onClick={() => setName('计数器' + Date.now())}>改名称</button>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}
function render() {
  index = 0
  ReactDOM.render(<Counter />, document.getElementById('root'))
}
render()
```