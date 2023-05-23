import React, {
  FocusEventHandler, MouseEventHandler,
  useContext, useEffect, useRef, useState
} from 'react'
import parse from 'html-react-parser'
import './TodoItem.css'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/TodoReducers'
import minusIcon from '../assets/minus.svg'
import plusIcon from '../assets/plus.svg'
import playIcon from '../assets/play.svg'
import stopIcon from '../assets/stop.svg'
import checkinIcon from '../assets/checkin.svg'
import toTopIcon from '../assets/totop.svg'
import deleteIcon from '../assets/delete.svg'
import Label from './Label'

type TodoItemProps = {
  todo: TodoType
  editable: boolean
  setDraggable: (dragable: boolean) => void
}

function TodoItem({todo, editable, setDraggable}: TodoItemProps) {

  const {id, title, task, showTask, state, color} = todo

  const {todosState, todosDispatch} = useContext(TodoContext)
  const [markupTask, setMarkupTask] = useState('')
  const [openTask, setOpenTask] = useState(false)
  const [editing, setEditing] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const detailsHeight = useRef(0)

  const isFirst = todosState.todos[0]?.id === id

  const onClickDelete = (): void => {
    if (confirm(`Delete todo item "${title}"?`)) {
      todosDispatch({type: Types.Delete, payload: {id}})
    }
  }

  const onClickFinish = (): void => {
    todosDispatch({type: Types.Finish, payload: {id}})
  }

  const onClickDetails = (): void => {
    if (!editing) {
      todosDispatch({
        type: Types.Update, payload: {
          id, title, task, showTask: !showTask, state, color
        }
      })
      setOpenTask(!openTask)
    }
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
    if (openTask) {
      return 'Hide Details'
    }
    return 'Show Details'
  }

  const editTitle: FocusEventHandler<HTMLDivElement> = (e): void => {
    if (e.currentTarget.textContent == null) return
    const title = stripHtml(e.currentTarget.textContent)
    todosDispatch({
      type: Types.Update, payload: {
        id, title, task, showTask, state, color
      }
    })
    setMarkupTask(replacer(markupTask))
    setDraggable(true)
    setEditing(false)
  }

  const editTask = (): void => {
    let t: TodoType
    if (taskRef.current != null) {
      t = {
        ...taskRef.current
      }
    } else {
      t = {
        id, title, task, showTask, state, color
      }
    }
    todosDispatch({type: Types.Update, payload: t})
    setMarkupTask(replacer(markupTask))
    setDraggable(true)
    setEditing(false)
    setTimeout(() => {
      if (detailsRef.current) {
        detailsHeight.current = detailsRef.current.scrollHeight
        detailsRef.current.style.height = `${detailsHeight.current}px`
      }
    }, 500)
  }

  const handleClickAndFocus = (): void => {
    setMarkupTask(task)
    setDraggable(false)
    setEditing(true)
  }

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (e): void => {
    handleClickAndFocus()
    e.currentTarget.focus()
  }

  const handleOnFocus: FocusEventHandler<HTMLDivElement> = (e): void => {
    if (!detailsRef.current) return
    detailsRef.current.style.height = `auto`
    handleClickAndFocus()
    e.currentTarget.focus()
  }

  const taskRef = useRef<TodoType>()

  function replacer(s: string): string {
    const re = new RegExp(/~~.+~~/gi)
    return s.replace(re, (match) => {
      return `✅ <span class="finished">${match.slice(2, -2)}</span>`
    })
      .replace(/\n- /g, '\n• ')
      .replace(/^- /, '• ')
  }

  useEffect(() => {
    setMarkupTask(replacer(task))
  }, [task])

  const onClickMoveToTop: MouseEventHandler<HTMLButtonElement> = (e): void => {
    if (confirm(`Move task "${title}" to top?`)) {
      const listId = e.currentTarget.parentElement?.parentElement?.parentElement?.id
      todosDispatch({type: Types.MovTop, payload: {id: Number(listId?.split('_')[1])}})
    }
  }

  const taskStateIcon = () => {
    switch (state) {
      case 'todo':
        return playIcon
      case 'doing':
        return stopIcon
      case 'finished':
        return checkinIcon
    }
  }

  useEffect(() => {
    console.log('TodoItem Loaded')
    setTimeout(() => {
      if (!detailsRef.current) return
      detailsHeight.current = detailsRef.current.scrollHeight
      if (showTask) {
        setOpenTask(true)
      }
    }, 500)
  }, [])

  return (
    <div
      className={'TodoItem'}
      style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue}`}}
    >
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start'}}>
        {state === 'finished' && <div style={{transform: 'translateY(.3em)'}}>✅ </div>}
        <div
          ref={titleRef}
          contentEditable={editable}
          suppressContentEditableWarning={true}
          onBlur={editTitle}
          spellCheck={false}
          className={`title ${
            state === 'finished' && 'strikeout toBackground'
          } ${
            state === 'doing' && 'italic'
          }`}
          style={{
            marginBottom: openTask ? '.6rem' : '0',
          }}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              event.preventDefault()
            }
          }}
        >{editing ? title : parse(title)}</div>
      </div>
      <div
        ref={detailsRef}
        style={{
          height: `${openTask ? `${detailsHeight.current}px` : '0'}`,
          marginTop: openTask ? '.5rem' : '0',
        }}
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onBlur={editTask}
        onClick={handleOnClick}
        onFocus={handleOnFocus}
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
            id, title, task: event.currentTarget.innerText, showTask, state, color
          }
        }}
        onKeyUp={(event) => {
          taskRef.current = {
            id, title, task: event.currentTarget.innerText, showTask, state, color
          }
        }}
        className={'task'}
      >
        {editing ? markupTask : parse(markupTask)}
      </div>
      <div className={'buttons'}>
        {state == 'doing' && <Label text="DOING" color="green"/>}
        {!editing && <button
          className={'btnCircle btnBackgroundColor btnColor toggle'}
          onClick={onClickDetails}
          title={showDetailsText()}
        >
          {openTask ?
            <img style={{width: '.4rem'}} src={minusIcon} alt={'minus'}/> :
            <img style={{width: '.5rem'}} src={plusIcon} alt={'plus'}/>}
        </button>}
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickFinish}
          title={showTaskState()}
        >
          <img style={{width: '.5rem'}} src={taskStateIcon()} alt={showTaskState()}/>
        </button>
        {!isFirst && <button
          className={'btnCircle btnBackgroundColor btnColor'}
          title={`move to top`}
          onClick={onClickMoveToTop}
        >
          <img style={{width: '.5rem'}} src={toTopIcon} alt={'move to top'}/>
        </button>}
        <button
          className={'btnCircle btnBackgroundColor btnColor'}
          onClick={onClickDelete}
          title={'Remove Task'}
        >
          <img style={{width: '.5rem'}} src={deleteIcon} alt={'Delete'}/>
        </button>
      </div>
    </div>
  )
}

export default TodoItem

function stripHtml(s: string): string {
  let tmp = document.createElement('DIV')
  tmp.innerHTML = s
  return tmp.textContent || tmp.innerText || ''
}
