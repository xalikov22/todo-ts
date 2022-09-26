import React, {createContext, useReducer, Dispatch} from 'react'
import {todoReducer, TodoType, TodoActions} from './TodoReducers'

type InitialStateType = {
  todos: TodoType[]
}

const initialState = {
  todos: []
}

const TodoContext = createContext<{
  todosState: InitialStateType
  todosDispatch: Dispatch<TodoActions>
}>({
  todosState: initialState,
  todosDispatch: () => null
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

  const localTodos = localStorage.getItem(`todoApp-${window.location.pathname}`)

  let todos: InitialStateType = initialState

  if (localTodos) {
    if (localTodos.length > 2) {
      todos = {
        todos: JSON.parse(localTodos)
      }
    }
  }

  const [todosState, todosDispatch] = useReducer(mainReducer, todos)

  return (
    <TodoContext.Provider value={{ todosState, todosDispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoProvider, TodoContext}
