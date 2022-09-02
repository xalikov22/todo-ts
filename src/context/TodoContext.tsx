import React, {createContext, useReducer, Dispatch} from 'react'
import {todoReducer, TodoType, TodoActions} from './reducers'

type InitialStateType = {
  todos: TodoType[]
}

const initialState = {
  todos: []
}

const TodoContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<TodoActions>
}>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (
  { todos }: InitialStateType,
  action: TodoActions
) => ({
  todos: todoReducer(todos, action)
})

type ProviderProps = {
  children: React.ReactNode
}

const TodoProvider = ({ children }: ProviderProps) => {

  const localTodos = localStorage.getItem('todoApp')

  let todos: InitialStateType = initialState

  if (localTodos) {
    if (localTodos.length > 2) {
      todos = {
        todos: JSON.parse(localTodos)
      }
    }
  }

  const [state, dispatch] = useReducer(mainReducer, todos)

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoProvider, TodoContext}
