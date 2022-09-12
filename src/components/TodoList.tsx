import React, {ChangeEvent, useContext, useEffect, useState} from 'react'
import {TodoContext} from '../context/TodoContext'
import {TodoType, Types} from '../context/reducers'
import TodoItem from './TodoItem'
import {uuid} from '../util'

function TodoList() {

  const {todosState, todosDispatch} = useContext(TodoContext)

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todosState.todos))
  }, [todosState])

  const [itemText, setItemText] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const onClick = () => {
    const color = {
      red: Math.floor(Math.random() * 100 + 150),
      green: Math.floor(Math.random() * 100 + 150),
      blue: Math.floor(Math.random() * 100 + 150)
    }
    // @ts-ignore
    todosDispatch({
      type: Types.Create,
      payload: {
        id: uuid(),
        title: itemTitle,
        task: itemText,
        state: 'todo',
        color: color
      }
    })
    setItemTitle('')
    setItemText('')
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', e.currentTarget.id)
  }

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const swap = ((arr:Array<any>, a:any, b:any) => {
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
    return arr
  })

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (todosState.todos.length < 2) {
      return
    }
    const targetId = Number(event.currentTarget.id.split('_')[1])
    const sourceId = Number(event.dataTransfer.getData('text').split('_')[1])
    todosDispatch({
      type: Types.Relist,
      payload: swap(todosState.todos, sourceId, targetId)
    })
  }

  const downloadJson = () => {
      const saveTemplateAsFile = (filename:string, dataObjToWrite:any) => {
        const blob = new Blob([JSON.stringify(dataObjToWrite)], {type: 'text/json'})
        const link = document.createElement('a')

        link.download = filename
        link.href = window.URL.createObjectURL(blob)
        link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')

        const evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })

        link.dispatchEvent(evt)
        link.remove()
      }
    saveTemplateAsFile('todos.json', todosState.todos)
  }

  const onChangeFile = async (e:ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return
    if (e.target.files && e.target.files[0]) {
      const updatedJSON = e.target.files[0]
      console.log(updatedJSON)
      const fileReader = new FileReader()
      fileReader.readAsText(e.target.files[0], 'UTF-8')
      fileReader.onload = e => {
        const target = e.target
        const result = target?.result
        let newTodos
        try {
          newTodos = JSON.parse(String(result))
        } catch {}
        todosDispatch({
          type: Types.Relist,
          payload: newTodos
        })
      }
    }
  }

  return (
    <div>
      <div>
        <div className={'todoInput'}>
          <h4>TITLE</h4>
          <input
            type={'text'}
            onChange={e => setItemTitle(e.currentTarget.value)}
            value={itemTitle}
            style={{width:'20rem'}}
          />
        </div>
        <div className={'todoInput'}>
          <h4>TASK</h4>
          <textarea
            onChange={e => setItemText(e.currentTarget.value)}
            value={itemText}
            style={{width:'20rem'}}
          />
        </div>
        <div>
          <button
            onClick={onClick}
            disabled={!(itemTitle.length > 0 && itemText.length > 0)}
          >Add Task</button> &nbsp;
          <button
            onClick={downloadJson}
          >Download to Disk</button> &nbsp;
          Restore: <input
            type='file'
            id='input_json'
            onChange={onChangeFile}
          />
        </div>
      </div>
      <div>
        {todosState.todos?.map((item: TodoType, index) =>
          <div
            key={item.id}
            id={`parent_${index}`}
            onDragOver={enableDropping}
            onDrop={handleDrop}
          >
            <div
              draggable={todosState.todos.length > 1}
              onDragStart={handleDragStart}
              id={`child_${index}`}
            >
              <TodoItem
                id={item.id}
                task={item.task}
                title={item.title}
                state={item.state}
                color={item.color}
              />
            </div>
          </div>)}
      </div>
      <input type={'text'}/>
    </div>
  )
}

export default TodoList
