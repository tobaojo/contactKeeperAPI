import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initalState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initalState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
      // TODO: Find a way to loaduser() after registering without refreshing
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (formdata) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formdata, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      setTimeout(() => loadUser(), 1000);
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
      // console.log(error.response.data.message);
    }
  };

  const login = async (formdata) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formdata, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      setTimeout(() => loadUser(), 1000);
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      // console.log(error.response.data.message);
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
