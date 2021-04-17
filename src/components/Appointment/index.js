import React from 'react';
import './styles.scss'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

import useVisualMode from '../../hooks/useVisualMode'

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = 'CONFIRM'

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
    transition(SHOW);
  };

  const deleteInterview = () => {
    transition(DELETE)
    props.cancelInterview(props.id)
    transition(EMPTY)
  }
  return(
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY  && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW  && <Show name={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => {console.log('clicked onEdit')}} onDelete={() => transition(CONFIRM)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETE && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteInterview} message={'Do you want to cancel the interview?'}/>}
    </article>
  );
};


export default Appointment;