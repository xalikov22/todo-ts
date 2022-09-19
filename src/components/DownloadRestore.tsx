import React, {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import './DownloadRestore.css'
import UploadButton from './UploadButton'

function DownloadRestore() {

  const {todosState} = useContext(TodoContext)

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

  return (
    <div className={'DownloadRestore'}>
      <button
        onClick={downloadJson}
      >Download</button>
      <UploadButton />
    </div>
  )
}

export default DownloadRestore
