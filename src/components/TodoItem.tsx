import React, {useContext, useState} from 'react'
import './TodoItem.css'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/reducers'

function TodoItem({id, title, task, state, color}: TodoType) {

  const {todosDispatch} = useContext(TodoContext)

  const [showDetails, setShowDetails] = useState(false)
  const [editable, setEditable] = useState(false)

  const onClickDelete = (): void => {
    if (confirm(`Delete todo item "${title}"?`)) {
      todosDispatch({type: Types.Delete, payload: {id}})
    }
  }

  const onClickFinish = (): void => {
    todosDispatch({type: Types.Finish, payload: {id}})
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

  const showDetailsText = () => {
    if (showDetails) {
      return 'Hide Details'
    }
    return 'Show Details'
  }

  const editTitle = (e:any) => {
    todosDispatch({type: Types.Update, payload: {
      id, title: e.currentTarget.textContent, task, state, color
    }})
    setEditable(false)
  }

  const editTask = (e:any) => {
    todosDispatch({type: Types.Update, payload: {
        id, title, task: e.currentTarget.textContent, state, color
      }})
    setEditable(false)
  }

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
      onDrop={() => console.log('dropped')}
    >
      <div
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onBlur={editTitle}
        onFocus={() => setEditable(true)}
        spellCheck={false}
        className={`title ${
        state === 'finished' && 'strikeout toBackground'
      } ${
        state === 'doing' && 'italic'
      }`}>{title}</div>
      {showDetails &&
        <div
          contentEditable={editable}
          onFocus={() => setEditable(true)}
          suppressContentEditableWarning={true}
          onBlur={editTask}
          spellCheck={false}
          className={'task'}
        >{task}</div>}
      <div className={'buttons'}>
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickDetails}
          title={showDetailsText()}
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
          title={'Remove Task'}
        >
          {/*<img src={DeleteIcon} alt={'Delete'} title={'Delete'}/>*/}
        </button>
      </div>
    </div>
  )
}

export default TodoItem
