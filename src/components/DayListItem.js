import React, { useState} from 'react'
import './DayListItem.scss'

const classNames = require('classnames');


export default  function DayListItem(props) {
  const dayListClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 
  'day-list__item--full': !props.spots})
  const spotsRemaining = props.spots;

  function formatSpotsRemaining () {
    if (spotsRemaining){
      return `${spotsRemaining} ${spotsRemaining > 1 ? 'spots' : 'spot'} remaining`;
    }
    return 'no spots remaining';

  }

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{formatSpotsRemaining(spotsRemaining)}</h2>
      <h3 className='text--light'> {props.spots} spots</h3>
    </li>
  )
}