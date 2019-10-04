import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //constants
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //object lookup
  const reducers = {
    [SET_DAY](state, action) {
      return { ...state, day: action.value };
    },
    [SET_APPLICATION_DATA](state, action) {
      return { ...state, days:action.results[0].data, appointments:action.results[1].data, interviewers:action.results[2].data};
      
    },
    [SET_INTERVIEW](state, action) {
      return {...state, appointments:{...state.appointments, [action.id]: {...state.appointments[action.id], interview: action.interview}}};
    }
  };

  //reducer
  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  //setting initial value of state
  const [state, dispatchState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => dispatchState({type: SET_DAY, value: day});
  
  const bookInterview = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then(() => {
        //id, interview - variables used to set state in reducers
        dispatchState({type: SET_INTERVIEW, id, interview});
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //setting interview to null to delete it
        dispatchState({type: SET_INTERVIEW, id, interview: null});
      });
  };

  //getting API data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((results) => {
        //results passed to set state in reducers
        dispatchState({type: SET_APPLICATION_DATA, results});
      })
      .catch((error) => console.log(error));
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}