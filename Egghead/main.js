import { createStore } from 'redux'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import React from 'react'
import ReactDOM from 'react-dom'

// Reducers
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
      break;
    default:
      return state
  }
}
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
      break;
    case 'REMOVE_TODO':
      return state.filter((todo) => { return todo.id !== action.id })
      break;
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
      break;
    default:
      return state;
  }
}
const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
    return action.filter
    break;
    default:
    return state;
  }
}
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   }
// }

// const todoApp = combineReducers({
//   todos: todos,
//   visibilityFilter: visibilityFilter
// })

import { combineReducers } from 'redux'
// const combineReducers = (reducers) => {
//   return function(state = {}, action) {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](state[key], action)
//         return nextState
//       }, {}
//     )
//   }
// }


const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// Tests
const testAddTodo = () => {
  const stateBefore = []
  const action = {
   type: 'ADD_TODO',
   id: 0,
   text: 'Learn Redux'
  }
  const stateAfter = [
    {
     id: 0,
     text: 'Learn Redux',
     completed: false
   }
  ]
  deepFreeze(stateBefore)
  deepFreeze(action)
  expect(todos(stateBefore, action)).toEqual(stateAfter)
}
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ]

  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)
  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

// testAddTodo()
// testToggleTodo()
// console.log('All tests passed');


//const store = createStore(todos)
const store = createStore(todoApp)

// console.log('Initail staete');
// console.log(store.getState());
// console.log('---------------');
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn redux'
// })
// console.log('Current state:');
// console.log(store.getState());
// console.log('---------------');
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Go shopping'
// })
// console.log('Current state');
// console.log(store.getState());
//
// console.log('Dispatching TOGGLE_TODO');
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0
// })
// console.log('Current state');
// console.log(store.getState());
// console.log('--------------');
//
// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })
// console.log('Current state');
// console.log(store.getState());
// console.log('--------------');
//
// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_ALL'
// })
// console.log('Current state');
// console.log(store.getState());
// console.log('--------------');


let nexTodoId = 0;
class TodoApp extends React.Component {
  render () {
    return (
      <div>
        <input ref={node => {
            this.input = node
          }}/>
        <button onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nexTodoId++
            })
            this.input.value = '';
          }}>Add Todo</button>
        <ul>
          {this.props.todos.map(todo =>
          <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'REMOVE_TODO',
                  id: todo.id
                })
              }}>
            {todo.text}
          </li>)}
        </ul>
      </div>
    )
  }
}

export default TodoApp

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
