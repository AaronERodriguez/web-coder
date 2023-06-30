import React from 'react'


function Range({value, changeState}) {
    const changeFont = (event) => {
        changeState(event.target.value)
    }
  return (
    <div>
  <input type="range" min="1" max="50" onChange={changeFont} value={value}  id="myRange" />
    </div>
  )
}

export default Range