import './TodoItem.css'
import React, {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/reducers'

function TodoItem({id, title, task, state, color}: TodoType) {

  const {dispatch} = useContext(TodoContext)

  const onClickDelete = () => {
    if (confirm(`Delete todo item "${title}"?`)) {
      dispatch({type: Types.Delete, payload: {id}})
    }
  }

  const onClickFinish = () => {
    dispatch({type: Types.Finish, payload: {id}})
  }

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
    >
      <div className={`title ${state === 'finished' && 'strikeout'}`} style={{textDecoration: state === 'finished' ? 'line-through' : 'none'}}>{title}</div>
      <div className={'task'}>{task}</div>
      <div className={'buttons'}>
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickFinish}
        >
          {/*<img src={DeleteIcon} alt={'Delete'} title={'Delete'}/>*/}
        </button>
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickDelete}
        >
          {/*<img src={DeleteIcon} alt={'Delete'} title={'Delete'}/>*/}
        </button>
      </div>
    </div>
  )
}

export default TodoItem
