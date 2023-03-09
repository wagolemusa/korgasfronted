// import React from 'react'
// import { createContext, useEffect, useReducer } from "react";
// import Reducer from "./Reducer";

// const INITIAL_STATE = {
//   user: JSON.stringify(localStorage.getItem("user")) || null,
//   isFetching: false,
//   error: false,
// };

// export const Context = createContext(INITIAL_STATE);

// export const ContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.user]);

//   return (
//     <Context.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

import { authConstants } from "./Actions";
import axios from "axios";
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SECCESS,
                payload: {
                    token, user
                }
            });
        }else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {error: 'Failed to Login'}
            });
        }
    }
}