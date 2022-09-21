import React, {FocusEventHandler, MouseEventHandler,
  useContext, useEffect, useRef, useState} from 'react'
import parse from 'html-react-parser'
import './TodoItem.css'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/reducers'

function TodoItem({id, title, task, state, color}: TodoType) {

  const {todosDispatch} = useContext(TodoContext)

  const [showDetails, setShowDetails] = useState(false)

  const [markupTask, setMarkupTask] = useState('')

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

  const editTitle:FocusEventHandler<HTMLDivElement> = (e): void => {
    todosDispatch({type: Types.Update, payload: {
      id, title: e.currentTarget.textContent!, task, state, color
    }})
    setMarkupTask(replacer(markupTask))
  }

  const editTask:FocusEventHandler<HTMLDivElement> = (e): void => {
    let t:TodoType
    if (taskRef.current != null) {
      t = taskRef.current
    } else {
      t = {
        id, title, task: e.currentTarget.textContent!, state, color
      }
    }
    todosDispatch({type: Types.Update, payload: t})
    setMarkupTask(replacer(markupTask))
  }

  const handleOnFocus:MouseEventHandler<HTMLDivElement> = (e): void => {
    setMarkupTask(task)
    e.currentTarget.focus()
  }

  const taskRef = useRef<TodoType>()

  function replacer(s: string): string {
    const re = new RegExp(/~~.+~~/gi)
    return s.replace(re, (match) => {
      return `✓<span class="finished">${match.slice(2, -2)}</span>`
    })
      .replace(/\n- /g, '\n• ')
      .replace(/^- /, '• ')
  }

  useEffect(() => {
    setMarkupTask(replacer(task))
  }, [task])

  const onClickMoveToTop:MouseEventHandler<HTMLButtonElement> = (e): void => {
    // console.log(e.currentTarget.parentElement?.parentElement?.parentElement?.id)
    const listId = e.currentTarget.parentElement?.parentElement?.parentElement?.id
    // if (listId == null) return
    todosDispatch({type: Types.MovTop, payload: {id: Number(listId?.split('_')[1])}})
  }

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
    >
      <div
        contentEditable={'true'}
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
         contentEditable={'true'}
         suppressContentEditableWarning={true}
         onBlur={editTask}
         onClick={handleOnFocus}
         spellCheck={false}
         onKeyDown={(event) => {
           if (event.key === 'Tab') {
             event.preventDefault()
             document.execCommand('insertText', false, '\t')
           }
           if (event.key === 'Enter') {
             event.preventDefault()
             document.execCommand('insertText', false, '\n')
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
      >{parse(markupTask)}</div>}
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
          title={`move to top`}
          onClick={onClickMoveToTop}
        >

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
