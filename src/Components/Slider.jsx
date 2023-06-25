import React from "react";
const Slider = ({onclick}) => {
    return (
        <div>
        <label className="switch">
            <input type="checkbox" onClick={onclick} />
            <span className="slider round"></span>
        </label>
        </div>
    )
}
export default Slider;