import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment/';
import useApplicationData from '../hooks/useApplicationData';
const {getAppointmentsForDay, getInterview, getInterviewersForDay} = require("helpers/selectors");

export default function Application(props) {
  
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData()
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={dailyInterviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} />
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
      <Appointment key="last" time="5pm" bookInterview={bookInterview} cancelInterview={cancelInterview} />
    </section>
  </main>
  );
}
