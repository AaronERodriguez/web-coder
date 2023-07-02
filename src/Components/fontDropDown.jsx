import React from 'react'

function FontDropDown({value, changeState}) {
    const changeFamily = event => [
        changeState(event.target.value)
    ]
    return (
    <label className='drop-down-container' for="families" onChange={changeFamily}>
        Select a font:
        <select name='families' id='famlies' defaultValue={value}>
            <option value="arial">Arial</option>
            <option value="cursive">Cursive</option>
            <option value="georgia">Georgia</option>
            <option value="monospace">Monospace (Default)</option>
            <option value="serif">Serif</option>
        </select>
    </label>
  )
}

export default FontDropDown