const getAppointmentsForDay = (state, day) => {
  let selectedAppointments = [];
  const filterAppointments = state.days.filter((filterDay) => filterDay.name === day)[0]
  
  if (!filterAppointments) {
    return [];
  }

  filterAppointments.appointments.forEach((id) => {
    selectedAppointments.push(state.appointments[id])
  });

  return selectedAppointments;
}

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerInfo =state.interviewers[interview.interviewer];
  
  console.log(interviewerInfo)
  return {interviewer: interviewerInfo, student: interview.student};
}
module.exports ={getAppointmentsForDay, getInterview};