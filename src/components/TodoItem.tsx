import './TodoItem.css'
import React, {useContext} from 'react'
import {TodoContext, TodoType} from '../context/TodoContext'
import {Types} from '../context/reducers'
import DeleteIcon from '../assets/delete-icon.svg'

function TodoItem({id, title, task, color}: TodoType) {

  const {dispatch} = useContext(TodoContext)

  const onClick = () => {
    if (confirm(`Delete todo item "${title}"?`)) {
      dispatch({type: Types.Delete, payload: {id}})
    }
  }

  return (
    <div className={'TodoItem'} style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}>
      <div className={'title'}>{title}</div>
      <div className={'task'}>{task}</div>
      <button className={'btnCircle btnBackgroundColor btnColor'} onClick={onClick}><img src={DeleteIcon} alt={'Delete'} title={'Delete'}/></button>
    </div>
  )
}

export default TodoItem
