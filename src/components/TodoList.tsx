import {useContext, useEffect, useState} from 'react'
import {TodoContext} from '../context/TodoContext'
import {Types, TodoType} from '../context/reducers'
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
        <ul>
          {todosState.todos?.map((item: TodoType) =>
            <li key={item.id}>
              <TodoItem
                id={item.id}
                task={item.task}
                title={item.title}
                state={item.state}
                color={item.color}
              />
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
