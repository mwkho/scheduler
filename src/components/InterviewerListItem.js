import React from 'react'
import 'InterviewerListItem.scss'

const classNames = require('classnames');


export default InterviewerListItem = (props) => {
  const interviewerClass = classNames('interviewers__item', {"interviewers__item":props.selected});

  return (
    <li key={props.id} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.name}
</li>
  )
}