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
      {speak(todosState.todos.length)} task{todosState.todos.length == 1 ? '' : 's'} •
      doing {speak(todosState.todos.filter((item) => item.state == 'doing').length)} •&nbsp;
      {speak(todo)} to do •&nbsp;
      {speak(todosState.todos.filter((item) => item.state == 'finished').length)} done
    </div>
  )
}

export default Stats

function speak(n: number): string {
  if (n === 0) return 'nothing'
  if (n === 1) return 'one'
  if (n === 2) return 'two'
  if (n === 3) return 'three'
  if (n === 4) return 'four'
  if (n === 5) return 'five'
  if (n === 6) return 'six'
  if (n === 7) return 'seven'
  if (n === 8) return 'eight'
  if (n === 9) return 'nine'
  if (n === 10) return 'ten'
  return `${n}`
}
