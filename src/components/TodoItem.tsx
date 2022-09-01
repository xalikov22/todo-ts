import './TodoItem.css'
import React, {useContext} from 'react'
import {TodoContext, TodoType} from '../context/TodoContext'
import {Types} from '../context/reducers'

function TodoItem({id, title, task}: TodoType) {

  const {dispatch} = useContext(TodoContext)

  const onClick = () => {
    dispatch({type: Types.Delete, payload: {id}})
  }
  return (
    <div className={'TodoItem'}>
      <h4>{title}</h4>
      <div>{task}</div>
      <button onClick={onClick}>delete</button>
    </div>
  )
}

export default TodoItem
