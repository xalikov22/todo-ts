import {useReducer} from 'react'

const initialState: TodoState = {
  items: []
}

export interface TodoItemType {
  id: string
  title: string
  task: string
}

interface TodoState {
  items: TodoItemType[]
}

type TodoAction =
  | { type: 'add', payload: TodoItemType }

function loginReducer(state: TodoState, action: TodoAction) {
  switch (action.type) {
    case 'add':
      console.log('add')
      const items = [...state.items]
      items.push(action.payload)
      return {
        items
      }
    default: return state
  }
}

export default function useTodo() {
  // return [state, dispatch]
  return useReducer(loginReducer, initialState, () => initialState)
}
