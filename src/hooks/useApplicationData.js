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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((responses) => {
      // console.log(responses[0].data)
      setState(prev => ({...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data}))
    })
  }, []);

  const setDay = day => setState({ ...state, day });


  const calculateSpots = (id, interview, spots) => { 
    // when deleting, add a spots
    if (!interview) {
      spots++
    }

    // -1 spot when previous is null, otherwise do nothing to spot
    if (interview) {
      if (!state.appointments[id].interview) { 
        spots --;
      }
    }
    return spots
  }
  const updateSpots = (id, interview) => {
    const foundDay = state.days.findIndex((element) => element.appointments.includes(id));

    // making an new updated day object to put into days
    const updatedDay = {...state.days[foundDay]};

    // getting a copy of days to not mutate it 
    let updatedDays = [...state.days];

    // call a helper function update spots
    updatedDay.spots = calculateSpots(id, interview, updatedDay.spots)

    updatedDays[foundDay] = updatedDay;
    setState({...state, days: updatedDays});
  };

  // helper function to make a new appointments
  const makeNewAppointment = (id, interview) => { 
    const appointment = {
      ...state.appointments[id],
      interview: interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return appointments
  }

  const bookInterview = (id, interview) => {
    // making a new appointment to update the state
    const appointments = makeNewAppointment(id, {...interview})

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        updateSpots(id, interview);
        setState(prev => ({...prev, appointments}))
      });
  };


  const cancelInterview = (id) =>  {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      // making a new appointment to update the state
      const appointments = makeNewAppointment(id, null)

      // update spots before setting the state
      updateSpots(id, null);
      setState(prev => ({...prev, appointments}))
    });
  };

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;