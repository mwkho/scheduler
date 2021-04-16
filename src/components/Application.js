import React, { useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment/'
import getAppointmentsForDay from "helpers/selectors";

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(' http://localhost:8001/api/days'),
      axios.get(' http://localhost:8001/api/appointments')
    ])
    .then((responses) => {
      setState(prev => ({...prev, days: responses[0].data, appointments: responses[1].data}))
    })
    .catch((err) => {
      console.log(err.response)
    })
  }, []);

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);


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
        { dailyAppointments.map((appointment) => {
          return(
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
