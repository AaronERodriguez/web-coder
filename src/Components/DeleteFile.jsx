import React from 'react'

function DeleteFile({removeFile}) {
    const deleteFile = () => {
        removeFile();
    }
    return (
        <button onClick={deleteFile} className="delete-file">Delete File</button>
    )
}

export default DeleteFile