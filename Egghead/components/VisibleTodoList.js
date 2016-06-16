import TodoList from './TodoList'
import { connect } from 'react-redux'
import toggleTodo from '../actionCreators/ToggleTodo'

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

export default VisibleTodoList
