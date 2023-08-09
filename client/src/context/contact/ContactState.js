import { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initalState = {
    contacts: [
      {
        id: 1,
        name: "Naruto Uzumaki",
        email: "hokageNaruto@email.com",
        phone: "111777",
        type: "professional",
      },
      {
        id: 2,
        name: "Sasuke Uchiha",
        email: "grassCutter@email.com",
        phone: "111456",
        type: "personal",
      },
      {
        id: 3,
        name: "Sakura Haruno",
        email: "cherryBlosom@email.com",
        phone: "111887",
        type: "personal",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initalState);

  //add contact

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
