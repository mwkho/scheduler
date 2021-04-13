import React from "react";
import "components/Button.scss";

const classNames = require('classnames');

export default function Button(props) {
   const {onClick} = props
   let buttonClass = classNames('button', {"button--danger":props.danger, 
            "button--confirm":props.confirm});  
            
   return <button disabled={props.disabled} onClick={onClick} className={buttonClass}>{props.children}</button>;
}
