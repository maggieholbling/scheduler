export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day)[0];
  const filteredAppointments = [];
  if (filteredDay) {
    for (const elem of filteredDay.appointments) {
      if (state.appointments[elem]) filteredAppointments.push(state.appointments[elem]);
    }
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  return { ...interview, interviewer: state.interviewers[interview.interviewer] };
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(eachDay => eachDay.name === day)[0];
  const filteredInterviews = [];
  if (filteredDay) {
    for (const elem of filteredDay.interviewers) {
      if (state.interviewers[elem]) filteredInterviews.push(state.interviewers[elem]);
    }
  }
  return filteredInterviews;
}