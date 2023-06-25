import React from "react";
const Slider = ({onclick, state}) => {
    let checked = state === "dark" ? false : true;
    return (
        <div>
        <label className="switch">
            <input type="checkbox" onClick={onclick} checked={checked} />
            <span className="slider round"></span>
        </label>
        </div>
    )
}
export default Slider;