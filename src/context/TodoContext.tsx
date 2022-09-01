import React, {createContext, useReducer, Dispatch} from 'react'
import {todoReducer, TodoActions} from './reducers'

export type TodoType = {
  id: string
  title: string
  task: string
}

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
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoProvider, TodoContext}
