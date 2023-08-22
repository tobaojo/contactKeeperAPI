import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";

const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
  };

  return (
    <alertContext.Provider
      value={{
        setAlert,
        alerts: state,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
