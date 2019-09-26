import React from 'react';
import './Button.css';
const Button = (props) => {
    let variableClass = "Button ";
    if(props.btnType){
       variableClass = variableClass.concat(props.btnType);
    }
    return (
        <button
            type={props.type==='submit'?'submit':'button'} 
            onClick={props.clicked}
            className={variableClass}
            >
            {props.children}
        </button>
    );
};

export default Button;