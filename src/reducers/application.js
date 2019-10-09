import {getAppointmentsForDay} from "helpers/selectors";

//constants
const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//object lookup
const reducers = {
  [SET_DAY](state, action) {
    return { ...state, day: action.value };
  },

  [SET_DAYS](state) {

    const days = state.days.map(day => {

      const spots = day.appointments.length - getAppointmentsForDay(state, day.name).reduce((accumulator, currentValue) => {
        return Number(currentValue.interview !== null) + accumulator;
      }, 0);

      const newObj = {...day, spots};
      return newObj;

    });

    return { ...state, days};
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
  if (reducers[action.type]) return reducers[action.type](state, action);
  throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
};

export {
    SET_DAY,
    SET_DAYS,
    SET_APPLICATION_DATA,
    SET_INTERVIEW,
};
export default reducer;