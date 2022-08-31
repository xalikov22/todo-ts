import './App.css'
import useCount from './hooks/useCount'
import {useState} from 'react'
import useTodo, {TodoItem} from './hooks/useTodo'

function App() {
  const [state, dispatch] = useCount()
  const [todoState, todoDispatch] = useTodo()
  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')
  const {count} = state
  const {items} = todoState
  const increase = () => {
    // @ts-ignore
    dispatch({type: 'increase'})
  }
  const onClick = () => {
    // @ts-ignore
    todoDispatch({
      type: 'add',
      payload: {
        title: itemTitle,
        task: itemText
      }
    })
    setItemTitle('')
    setItemText('')
  }
  return (
    <div className="App">
      <div className="card">
        <button onClick={increase}>
          count is {count}
        </button>
      </div>
      <div>
        <ul>
          {items?.map((item: TodoItem, index: number) => <li key={index}>{item.title}</li>)}
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
          <button onClick={onClick} disabled={!(itemTitle.length > 0 && itemText.length > 0)}>Add Todo Item</button>
        </div>
      </div>
    </div>
  )
}

export default App
