import { createStore } from 'redux'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
// Import reducers
import todoApp from './reducers/TodoApp'
// Import action creators
import setVisibilityFilter from './actionCreators/SetVisibilityFilter'
import toggleTodo from './actionCreators/ToggleTodo'
import addTodo from './actionCreators/AddTodo'
// Import compopnents
import TodoList from './components/TodoList'

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
const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = '';
        }}>Add Todo</button>
    </div>
  )
}
// Default behaviour: not subscribe to the store and inject the dispatch as a prop
AddTodo = connect()(AddTodo)



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

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
})
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

const persistedState = {
  todos: [{
    id: 9999,
    text: 'Welcome back!',
    completed: false
  }]
}
const store = createStore(todoApp, persistedState)
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
