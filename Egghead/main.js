import { createStore } from 'redux'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

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
      if (state.id !== action.id)
        return state
      else
        return Object.assign({}, state, { completed: !state.completed })
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

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active)
    return <span>{children}</span>
  else
    return (
      <a href='#'
          onClick={e => {
            e.preventDefault();
            onClick()
          }}
      >
        {children}
      </a>
    )
}

// Prensentational component: only handles how things look
const Todo = ({
  onClick,
  completed,
  text,
  id
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
)

// Prensentational component: only handles how things look
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

// Prensentational component: only handles how things look
// Marche pas
const RemoveTodo = ({
  todo,
  onRemoveTodoClick
}) => (
  <button onClick={onRemoveTodoClick}>Remove</button>
)

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: nexTodoId++,
          text: input.value
        })
        input.value = '';
        }}>Add Todo</button>
    </div>
  )
}
// Default behaviour: not subscribe to the store and inject the dispatch as a prop
AddTodo = connect()(AddTodo)

class FilterLink extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>  store.dispatch({
                          type: 'SET_VISIBILITY_FILTER',
                          filter: props.filter
                        })}
      >
        {props.children}
      </Link>
    )
  }
}
FilterLink.contextTypes  = {
  store: React.PropTypes.object
}

const Footer = () => (
  <p>
    Show:
    <FilterLink filter='SHOW_ALL'>All</FilterLink>{' '}
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>{' '}
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>{' '}
  </p>
);

const getVisibleTodos = ( todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
      break;
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => { return !todo.completed });
      break;
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => { return todo.completed });
      break;
  }
}


const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) =>
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

let nexTodoId = 0;

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
