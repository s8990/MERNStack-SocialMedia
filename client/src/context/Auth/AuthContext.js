import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  // user: null,
  user: {
    _id: "60e84fe03298b31314aac8ee",
    username: "saeed",
    email: "saeed@test.com",
    profilePicture: "images/profile/001.jpg",
    coverPicture: "images/profile/001.jpg",
    isAdmin: false,
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
