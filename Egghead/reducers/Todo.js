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

export default todo
