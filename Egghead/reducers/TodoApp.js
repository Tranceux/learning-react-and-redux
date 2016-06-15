import { combineReducers } from 'redux'
import todos from './Todos'
import visibilityFilter from './VisibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
