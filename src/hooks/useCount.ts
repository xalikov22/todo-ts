import {useReducer} from 'react'

const initialState: CountState = {
  count: 0
}

interface CountState {
  count: 0
}

// Naive:
// interface CountAction {
//   type: string
//   fieldName?: string
//   payload?: string
// }

type CountAction =
  | { type: 'increase' }

function loginReducer(state: CountState, action: CountAction) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        count: state.count + 1
      }
    default: return state
  }
}

export default function useCount() {
  // return [state, dispatch]
  // @ts-ignore
  return useReducer(loginReducer, initialState, () => initialState)
}
