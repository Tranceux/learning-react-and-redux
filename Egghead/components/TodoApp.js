import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList todos={[]} />
    <Footer />
  </div>
)

export default TodoApp
