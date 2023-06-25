import React from "react";
const Button = ({title, className, onclick, id}) => {
    return (
        <div>
            <button 
            style={{
                maxWidth: "140px",
                minWidth: "80px",
                height: "30px",
                marginRight: "5px",
            }}
            onClick={onclick}
            id={id}
            className={className}
            >
                {title}
            </button>
        </div>
    )
}
export default Button