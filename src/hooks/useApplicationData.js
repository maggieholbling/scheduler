import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, { SET_DAY, SET_DAYS, SET_APPLICATION_DATA, SET_INTERVIEW} from "reducers/application";


export default function useApplicationData() {
    
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
        //updating spots
        dispatchState({type: SET_DAYS});
      })
      .catch((error) => {throw error});
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //setting interview to null to delete it
        dispatchState({type: SET_INTERVIEW, id, interview: null});
        //updating spots
        dispatchState({type: SET_DAYS});
      })
      .catch((error) => {throw error});
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
        //updating spots
        dispatchState({type: SET_DAYS});
      })
      .catch((error) => {throw error});
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}


