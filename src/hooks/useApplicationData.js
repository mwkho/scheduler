import { useState, useEffect} from "react";

import axios from 'axios';
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((responses) => {
      setState(prev => ({...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data}))
    })
  }, []);

  const setDay = day => setState({ ...state, day });

  const updateSpots = (id) => {
    const foundDay = state.days.findIndex((element) => element.appointments.includes(id));
    const updatedDay = {...state.days[foundDay]};
    let updatedDays = [...state.days];
    state.appointments[id].interview ? updatedDay.spots++  : updatedDay.spots--
    updatedDays[foundDay] = updatedDay;
    setState({...state, days: updatedDays});
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        updateSpots(id);
        setState(prev => ({...prev, appointments}))
      });
  };


  const cancelInterview = (id) =>  {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      updateSpots(id);
      setState(prev => ({...prev, appointments}))
    });
  };

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;