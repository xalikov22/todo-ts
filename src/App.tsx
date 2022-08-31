import './App.css'
import {useState} from 'react'
import useTodo, {TodoItemType} from './hooks/useTodo'
import TodoItem from './components/TodoItem'
import {uuid} from './util'

function App() {

  const [todoState, todoDispatch] = useTodo()
  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const {items} = todoState

  const onClick = () => {
    // @ts-ignore
    todoDispatch({
      type: 'add',
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
    <div className="App">
      <div>
        <ul>
          {items?.map((item: TodoItemType) =>
            <li key={item.id}>
              <TodoItem
                id={item.id}
                task={item.task}
                title={item.title}
              />
            </li>)}
        </ul>
      </div>
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
    </div>
  )
}

export default App
