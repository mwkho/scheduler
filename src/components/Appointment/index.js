import React from 'react';
import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer: interviewer
    };

    // show saving animation and transition to show when done
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
  };

  const deleteInterview = () => {
    // show deleting animation and transition to show when done replacing CONFIRM screen
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)
    })
    .catch((error) => {
      transition(ERROR_DELETE, true);
    });
  }
  return(
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY  && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW  && <Show name={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => {transition(EDIT)}} onDelete={() => transition(CONFIRM)}/>}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETE && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteInterview} message={'Do you want to cancel the interview?'}/>}
      {mode === ERROR_SAVE && <Error message='There was an error saving your changes.' onClose={back}/>}
      {mode === ERROR_DELETE && <Error message='There was an error deleting your interview.' onClose={back}/>}
    </article>
  );
};


export default Appointment;