import todo from './Todo'

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

export default todos
