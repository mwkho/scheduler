import React, { useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment/'
const {getAppointmentsForDay, getInterview, getInterviewersForDay} = require("helpers/selectors");

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(' http://localhost:8001/api/days'),
      axios.get(' http://localhost:8001/api/appointments'),
      axios.get(' http://localhost:8001/api/interviewers')

    ])
    .then((responses) => {
      setState(prev => ({...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data}))
    })
    .catch((err) => {
      console.log(err.response)
    })
  }, []);

  const bookInterview = (id, interview, transition, mode) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment.interview)
    .then(() => {
      setState({...state, appointments});
    });
    

  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={dailyInterviewers} bookInterview={bookInterview} />
    )
  });

 

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay} 
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" bookInterview={bookInterview} />
    </section>
  </main>
  );
}
