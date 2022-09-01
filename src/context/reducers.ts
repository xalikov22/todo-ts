type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key
    }
    : {
      type: Key
      payload: M[Key]
    }
}

export enum Types {
  Create = 'CREATE_TODO',
  Finish = 'FINISH_TODO',
  Delete = 'DELETE_TODO',
}

export type TodoType = {
  id: string
  title: string
  task: string
  state: 'todo' | 'doing' | 'finished'
  color: { red: number, green: number, blue: number }
}

type TodoPayload = {
  [Types.Create]: {
    id: string
    title: string
    task: string
    state: 'todo' | 'doing' | 'finished'
    color: { red: number, green: number, blue: number }
  }
  [Types.Finish]: {
    id: string
  }
  [Types.Delete]: {
    id: string
  }
}

export type TodoActions = ActionMap<TodoPayload>[keyof ActionMap<
  TodoPayload
  >]

export const todoReducer = (
  state: TodoType[],
  action: TodoActions
) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          task: action.payload.task,
          state: action.payload.state,
          color: action.payload.color
        }
      ]
    case Types.Finish:
      return [...state.map(todo => {
        let currentState = todo.state
        if (todo.id === action.payload.id) {
          if (todo.state === 'finished') {
            currentState = 'todo'
          } else {
            currentState = 'finished'
          }
        }
        return {
          ...todo,
          state: currentState
        }
      })]
    case Types.Delete:
      return [...state.filter(todo => todo.id !== action.payload.id)]
    default:
      return state
  }
}
