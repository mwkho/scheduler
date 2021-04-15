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

export default getAppointmentsForDay;