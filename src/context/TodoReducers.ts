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
  Update = 'UPDATE_TODO',
  Finish = 'FINISH_TODO',
  Delete = 'DELETE_TODO',
  Relist = 'RELIST_TODO',
  MovTop = 'MOVTOP_TODO',
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
  [Types.Update]: {
    id: string
    title: string
    task: string
    state: 'todo' | 'doing' | 'finished'
    color: { red: number, green: number, blue: number }
  }
  [Types.Relist]: TodoType[]
  [Types.MovTop]: {
    id: number
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
    case Types.Update:
      const s = [...state]
      const index = s.findIndex(item => item.id === action.payload.id)
      s[index].title = action.payload.title
      s[index].task = action.payload.task
      return [...s]
    case Types.Finish:
      return [...state.map(todo => {
        let currentState = todo.state
        if (todo.id === action.payload.id) {
          switch (todo.state) {
            case 'todo':
              currentState = 'doing'
              break
            case 'doing':
              currentState = 'finished'
              break
            case 'finished':
              currentState = 'todo'
              break
          }
        }
        return {
          ...todo,
          state: currentState
        }
      })]
    case Types.Delete:
      return [...state.filter(todo => todo.id !== action.payload.id)]
    case Types.Relist:
      return [...action.payload]
    case Types.MovTop:
      const s2 = [...state]
      const target = action.payload.id
      const task = s2[target]
      s2.splice(target, 1)
      s2.unshift(task)
      return [...s2]
    default:
      return state
  }
}
