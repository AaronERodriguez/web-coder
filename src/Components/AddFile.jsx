import React from 'react'

function AddFile({addFile}) {
    const createFile = () => {
        addFile(document.getElementById("fname").value)
    }
  return (
    <label className='drop-down-container'>
        Type a File Name: 
        <input type="text" name="fname" id="fname" />
        <button onClick={createFile}>Create File</button>
    </label>
  )
}

export default AddFile