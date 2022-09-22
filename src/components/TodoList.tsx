import React, {DragEventHandler, useContext, useEffect, useState} from 'react'
import {TodoContext} from '../context/TodoContext'
import {TodoType, Types} from '../context/reducers'
import TodoItem from './TodoItem'
import ButtonBox from './ButtonBox'
import Stats from './Stats'

function TodoList() {

  const {todosState, todosDispatch} = useContext(TodoContext)
  const [editable, setEditable] = useState(true)

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todosState.todos))
  }, [todosState])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setEditable(false)
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

  const handleDrop:DragEventHandler<HTMLDivElement> = (e): void => {

    e.preventDefault()

    if (todosState.todos.length < 2) {
      return
    }

    const targetId = Number(e.currentTarget.id.split('_')[1])
    const sourceId = Number(e.dataTransfer.getData('text').split('_')[1])

    todosDispatch({
      type: Types.Relist,
      payload: swap(todosState.todos, sourceId, targetId)
    })
    setEditable(true)

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
            onDragEnd={() => setEditable(true)}
          >
            <div
              draggable={todosState.todos.length > 1}
              onDragStart={handleDragStart}
              id={`todo^child_${index}`}
            >
              <TodoItem
                todo={{
                  id: item.id,
                  task: item.task,
                  title: item.title,
                  state: item.state,
                  color: item.color
                }}
                editable={editable}
              />
            </div>
          </div>)}
      </div>
      <ButtonBox />
      <Stats />
      {/*<input type={'text'}/>*/}
    </div>
  )
}

export default TodoList
