import { useState, useEffect} from "react";

const axios = require('axios');

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

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


  const setDay = day => setState({ ...state, day });

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
        setState({...state, appointments})
        return axios.get(' http://localhost:8001/api/days');
      })
      .then((response) => {
        setState(prev => ({...prev, days:response.data}))
      })
  };


  const cancelInterview = (id) =>  {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      return axios.get('http://localhost:8001/api/days');
    })
    .then((response) => {
      setState(prev => ({...prev, days:response.data}))
    })
  };


  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;