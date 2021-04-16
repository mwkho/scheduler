import React from 'react';
import './styles.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'

import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY  && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW  && <Show name={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => {console.log('clicked onEdit')}} onDelete={() => {console.log('clicked onDelete')}}/>}
      {mode === CREATE && <Form interviewers={[]} onSave={() => {console.log('click onSave')}} onCancel={back} />}
    </article>
  );
};


export default Appointment;