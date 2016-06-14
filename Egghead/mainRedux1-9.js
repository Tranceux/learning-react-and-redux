import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'

ReactDOM.render(<App />, document.getElementById('app'))


/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;

  }
}
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)
const store = createStore(counter)
const render = () => {
  //document.body.innerText = store.getState()
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type:'INCREMENT'})}
      onDecrement={() => store.dispatch({type:'DECREMENT'})}/>,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
