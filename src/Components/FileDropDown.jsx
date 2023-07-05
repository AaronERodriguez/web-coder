import React from 'react'

function FileDropDown({value, changeState}) {
    const changeFile = event => [
        changeState(event.target.value)
    ]
  return (
    <label className='drop-down-container' onChange={changeFile}>
        Select a File: 
        <select name='files' id='files' defaultValue={value}>
            <option value="placeHolder">Create a File</option>
            <option value="test">Test</option>
        </select>
    </label>
  )
}

export default FileDropDown