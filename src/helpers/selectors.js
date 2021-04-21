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

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {interviewer: interviewerInfo, student: interview.student};
}

const getInterviewersForDay = (state, day) => {
  let selectedInterviewers = [];
  const filterInterviewers = state.days.filter((filterDay) => filterDay.name === day)[0]
  if (!filterInterviewers) {
    return [];
  }
  filterInterviewers.interviewers.forEach((id) => {
    selectedInterviewers.push(state.interviewers[id])
  });
  return selectedInterviewers;
}


module.exports ={getAppointmentsForDay, getInterview, getInterviewersForDay};