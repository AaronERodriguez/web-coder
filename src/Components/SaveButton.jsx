import React from 'react'

function SaveButton({saveFunction}) {
  return (
    <button 
    style={{
        maxWidth: "140px",
        minWidth: "80px",
        height: "30px",
        marginRight: "5px",
        backgroundColor: "#0d6efd",
        color: "white",
    }}
    onClick={saveFunction}>AutoSave</button>
  )
}

export default SaveButton