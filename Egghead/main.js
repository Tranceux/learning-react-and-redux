import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './components/TodoApp'
import TodoAppReducer from './reducers/TodoApp'
//const persistedState = {}
// const persistedState = loadState()
const store = createStore(TodoAppReducer)
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
