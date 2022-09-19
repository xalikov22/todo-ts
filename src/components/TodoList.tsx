import React, {useContext, useEffect} from 'react'
import {TodoContext} from '../context/TodoContext'
import {TodoType, Types} from '../context/reducers'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import DownloadRestore from './DownloadRestore'

function TodoList() {

  const {todosState, todosDispatch} = useContext(TodoContext)

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todosState.todos))
  }, [todosState])

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
    if (todosState.todos.length < 2) {
      return
    }
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
        {todosState.todos?.map((item: TodoType, index) =>
          <div
            key={item.id}
            id={`parent_${index}`}
            onDragOver={enableDropping}
            onDrop={handleDrop}
          >
            <div
              draggable={todosState.todos.length > 1}
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
      <NewTodo />
      <DownloadRestore />
      <input type={'text'}/>
    </div>
  )
}

export default TodoList
