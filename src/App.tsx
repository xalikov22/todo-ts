import './App.css'

import TodoList from './components/TodoList'
import {TodoProvider} from './context/TodoContext'

function App() {

  return (
    <div className="App">
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </div>
  )
}

export default App
