import {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import './Stats.css'

function Stats() {

  const {todosState} = useContext(TodoContext)

  return (
    <div className={`Stats`}>
      {todosState.todos.length} thing{todosState.todos.length == 1 ? '' : 's'} todo, &nbsp;
      {todosState.todos.filter((item) => item.state == 'doing').length} doing, &nbsp;
      {todosState.todos.filter((item) => item.state == 'finished').length} done
    </div>
  )
}

export default Stats
