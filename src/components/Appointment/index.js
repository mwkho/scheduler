import React from 'react';
import './styles.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'

import useVisualMode from '../../hooks/useVisualMode'

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer: interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    // transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY  && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW  && <Show name={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => {console.log('clicked onEdit')}} onDelete={() => {console.log('clicked onDelete')}}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message='Saving...'/>}
    </article>
  );
};


export default Appointment;