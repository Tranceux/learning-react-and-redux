import React from 'react'
import addTodo from '../actionCreators/AddTodo'
import { connect } from 'react-redux'

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

export default AddTodo
