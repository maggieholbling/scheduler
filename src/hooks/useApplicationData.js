import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then((response) => {
        console.log(response);
        setState(prev => ({ ...prev, appointments}));
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log(response);
        setState(prev => ({...prev, appointments:{...prev.appointments, [id]: {...prev.appointments[id], interview: null}}}));
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((results) => {
        setState(prev => ({ ...prev, days:results[0].data, appointments:results[1].data, interviewers:results[2].data}));
      })
      .catch((error) => console.log(error));
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}