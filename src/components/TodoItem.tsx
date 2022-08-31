import {TodoItemType} from '../hooks/useTodo'
import './TodoItem.css'

function TodoItem({id, title, task}: TodoItemType) {
  return (
    <div className={'TodoItem'}>
      <h4>{title}</h4>
      <div>{id} {task}</div>
    </div>
  )
}

export default TodoItem
