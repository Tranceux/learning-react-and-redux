let nexTodoId = 0;

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nexTodoId++,
    text
  }
}

export default addTodo
