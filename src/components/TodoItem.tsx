import React, {useContext, useRef, useState} from 'react'
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
    let t:TodoType
    if (taskRef.current != null) {
      t = taskRef.current
    } else {
      t = {
        id, title, task: e.currentTarget.textContent, state, color
      }
    }
    todosDispatch({type: Types.Update, payload: t})
    setEditable(false)
  }

  const handleOnFocus = () => {
    setEditable(true)
  }

  const taskRef = useRef<TodoType>()

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
      // onDrop={() => console.log('dropped')}
    >
      <div
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onBlur={editTitle}
        onClick={handleOnFocus}
        spellCheck={false}
        className={`title ${
        state === 'finished' && 'strikeout toBackground'
      } ${
        state === 'doing' && 'italic'
      }`}
        style={{whiteSpace: 'pre-wrap'}}
      >{title}</div>
      {showDetails &&
       <div
         style={{whiteSpace: 'pre-wrap'}}
         contentEditable={editable}
         suppressContentEditableWarning={true}
         onBlur={editTask}
         onClick={handleOnFocus}
         spellCheck={false}
         onKeyDown={(event) => {
           if (event.key === 'Tab') {
             event.preventDefault()
             document.execCommand('insertText', false, '\t');
           }
           if (event.key === 'Enter') {
             event.preventDefault()
             document.execCommand('insertText', false, '\n');
           }
           taskRef.current = {
             id, title, task: event.currentTarget.innerText, state, color
           }
         }}
         onKeyUp={(event) => {
           taskRef.current = {
             id, title, task: event.currentTarget.innerText, state, color
           }
         }}
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
