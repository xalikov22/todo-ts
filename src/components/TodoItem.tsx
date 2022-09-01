import React, {useContext, useState} from 'react'
import './TodoItem.css'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/reducers'

function TodoItem({id, title, task, state, color}: TodoType) {

  const {dispatch} = useContext(TodoContext)

  const [showDetails, setShowDetails] = useState(false)

  const onClickDelete = (): void => {
    if (confirm(`Delete todo item "${title}"?`)) {
      dispatch({type: Types.Delete, payload: {id}})
    }
  }

  const onClickFinish = (): void => {
    dispatch({type: Types.Finish, payload: {id}})
  }

  const onClickDetails = (): void => {
    setShowDetails(show => !show)
  }

  const showTaskState = () => {
    switch (state) {
      case 'todo':
        return 'Start Task'
      case 'doing':
        return 'Finish Task'
      case 'finished':
        return 'Add to Todo'
    }
  }

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
    >
      <div className={`title ${
        state === 'finished' && 'strikeout toBackground'
      } ${
        state === 'doing' && 'italic'
      }`}>{title}</div>
      {showDetails && <div className={'task'}>{task}</div>}
      <div className={'buttons'}>
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickDetails}
          title={'Collapse'}
        >
          {/*<img src={DeleteIcon} alt={'Delete'} title={'Delete'}/>*/}
        </button>
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickFinish}
          title={showTaskState()}
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
