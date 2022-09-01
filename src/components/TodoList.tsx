import {TodoContext, TodoType} from '../context/TodoContext'
import {Types} from '../context/reducers'
import TodoItem from './TodoItem'
import {useContext, useState} from 'react'
import {uuid} from '../util'

function TodoList() {

  const {state, dispatch} = useContext(TodoContext)

  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const onClick = () => {
    // @ts-ignore
    dispatch({
      type: Types.Create,
      payload: {
        id: uuid(),
        title: itemTitle,
        task: itemText
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
          {state.todos?.map((item: TodoType) =>
            <li key={item.id}>
              <TodoItem
                id={item.id}
                task={item.task}
                title={item.title}
              />
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
