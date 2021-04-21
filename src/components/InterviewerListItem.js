import React from 'react'
import './InterviewerListItem.scss'

const classNames = require('classnames');


const InterviewerListItem = (props) => {
  const interviewerClass = classNames('interviewers__item', {"interviewers__item--selected":props.selected});

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )
}

export default InterviewerListItem;