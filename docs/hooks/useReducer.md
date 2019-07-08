# useReducer
## useReducer初始化
### 初始化state有两种方式
- **一种是直接将useReducer的第二个参数作为初始值**

```js
import React, {useReducer} from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const initialState = {count: 0};

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}

export default Counter
```
- **第二种惰性初始化**  
useReducer通过第三个参数init来初始化，他将返回一个对象作为state，这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利
```js
import React, {useReducer} from 'react'

const initialCount = 0
function init(initialCount) {
  return {
    count: initialCount,
    age: 14
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count},
      age: {state.age}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>

        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}

export default Counter
```

## useReducer与useContext结合
使用useReducer与useContext结合可以避免向子组件一层层的传递回调
```js
import React, { useReducer, useContext } from 'react'
import reducer from './reducer';
import * as types from './actionTypes';

const CounterContext1 = React.createContext();

const Counter1 = () => {
  let { state, dispatch } = useContext(CounterContext1);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>-</button>
    </div>
  )
}

function App() {
  let [state, dispatch] = useReducer(reducer, { number: 0 });
  return (
    <>
      <CounterContext1.Provider value={{ state, dispatch }}>
        <Counter1 />
      </CounterContext1.Provider>
    </>
  )
}
export default App;
```
```js
// actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT= 'DECREMENT';
```
```js
// reducer.js
import * as types from './actionTypes';
export default function reducer(state, action) {
  switch (action.type) {
    case types.INCREMENT:
      return { number: state.number + 1 };
    case types.DECREMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
```