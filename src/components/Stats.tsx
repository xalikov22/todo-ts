import {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import './Stats.css'

function Stats() {

  const {todosState} = useContext(TodoContext)

  const todo =
    todosState.todos.length -
    todosState.todos.filter(item => item.state === 'doing').length -
    todosState.todos.filter(item => item.state === 'finished').length

  return (
    <div className={`Stats`}>
      {todosState.todos.length} task{todosState.todos.length == 1 ? '' : 's'}, &nbsp;
      {todosState.todos.filter((item) => item.state == 'doing').length} doing, &nbsp;
      {todo} to do, &nbsp;
      {todosState.todos.filter((item) => item.state == 'finished').length} done
    </div>
  )
}

export default Stats
