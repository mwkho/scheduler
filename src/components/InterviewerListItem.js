import React from 'react'
import './InterviewerListItem.scss'

const classNames = require('classnames');


const InterviewerListItem = (props) => {
  const interviewerClass = classNames('interviewers__item', {"interviewers__item--selected":props.selected});

  return (
    <li key={props.id} onClick={() => {props.setInterviewer(props.id)}} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.selected ? props.name:''}
</li>
  )
}

export default InterviewerListItem;