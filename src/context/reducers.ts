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
  Create = "CREATE_TODO",
  Delete = "DELETE_TODO",
}

type TodoType = {
  id: string
  title: string
  task: string
}

type TodoPayload = {
  [Types.Create]: {
    id: string
    title: string
    task: string
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
          task: action.payload.task
        }
      ]
    case Types.Delete:
      return [...state.filter(todo => todo.id !== action.payload.id)]
    default:
      return state
  }
}
