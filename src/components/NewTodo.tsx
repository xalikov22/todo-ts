import React, {useContext, useState} from 'react'
import {Types} from '../context/reducers'
import {uuid} from '../util'
import {TodoContext} from '../context/TodoContext'
import './NewTodo.css'

function NewTodo() {

  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const {todosDispatch} = useContext(TodoContext)

  const onClick = (): void => {
    const color = {
      red: Math.floor(Math.random() * 100 + 150),
      green: Math.floor(Math.random() * 100 + 150),
      blue: Math.floor(Math.random() * 100 + 150)
    }
    todosDispatch({
      type: Types.Create,
      payload: {
        id: uuid(),
        title: itemTitle,
        task: itemText,
        state: 'todo',
        color: color
      }
    })

    setItemTitle('')
    setItemText('')
  }

  return (
    <div className={'NewTodo'}>
      <div className={'todoInput'}>
        <h4>TITLE</h4>
        <input
          type={'text'}
          onChange={e => setItemTitle(e.currentTarget.value)}
          value={itemTitle}
          style={{width:'20rem'}}
        />
      </div>
      <div className={'todoInput'}>
        <h4>TASK</h4>
        <textarea
          onChange={e => setItemText(e.currentTarget.value)}
          value={itemText}
          style={{width:'20rem'}}
        />
      </div>
      <div>
        <button
          onClick={onClick}
          disabled={!(itemTitle.length > 0 && itemText.length > 0)}
        >Add Task</button>
      </div>
    </div>
  )
}

export default NewTodo
