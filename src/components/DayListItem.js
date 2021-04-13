import React, { useState} from 'react'
const classNames = require('classnames');


export default  function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'> {props.spots} spots</h3>
    </li>
  )
}