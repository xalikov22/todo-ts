import React, {useContext, useEffect, useState} from 'react'
import {TodoContext} from '../context/TodoContext'
import {TodoType, Types} from '../context/reducers'
import TodoItem from './TodoItem'
import {uuid} from '../util'

function TodoList() {

  const {todosState, todosDispatch} = useContext(TodoContext)

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todosState.todos))
  }, [todosState])

  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const onClick = () => {
    const color = {
      red: Math.floor(Math.random() * 100 + 150),
      green: Math.floor(Math.random() * 100 + 150),
      blue: Math.floor(Math.random() * 100 + 150)
    }
    // @ts-ignore
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', e.currentTarget.id)
  }

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const swap = ((arr:Array<any>, a:any, b:any) => {
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
    return arr
  })

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const targetId = Number(event.currentTarget.id.split('_')[1])
    const sourceId = Number(event.dataTransfer.getData('text').split('_')[1])
    todosDispatch({
      type: Types.Relist,
      payload: swap(todosState.todos, sourceId, targetId)
    })
  }

  return (
    <div>
      <div>
        <div className={'todoInput'}>
          <h4>TITLE</h4>
          <input
            type={'text'}
            onChange={e => setItemTitle(e.currentTarget.value)}
            value={itemTitle}
          />
        </div>
        <div className={'todoInput'}>
          <h4>TASK</h4>
          <input
            type={'text'}
            onChange={e => setItemText(e.currentTarget.value)}
            value={itemText}
          />
        </div>
        <div>
          <button
            onClick={onClick}
            disabled={!(itemTitle.length > 0 && itemText.length > 0)}
          >Add Todo Item</button>
        </div>
      </div>
      <div>
        {todosState.todos?.map((item: TodoType, index) =>
          <div
            key={item.id}
            id={`parent_${index}`}
            onDragOver={enableDropping}
            onDrop={handleDrop}
          >
            <div
              draggable={true}
              onDragStart={handleDragStart}
              id={`child_${index}`}
            >
              <TodoItem
                id={item.id}
                task={item.task}
                title={item.title}
                state={item.state}
                color={item.color}
              />
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default TodoList
