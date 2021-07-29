import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { loginCall } from "../../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import "./styles.css";

export default function LoginRight() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="loginRight">
      <form className="loginBox" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          required
          className="loginInput"
          ref={email}
        />
        <input
          placeholder="Password"
          type="password"
          required
          minLength="6"
          className="loginInput"
          ref={password}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? (
            <CircularProgress color="white" size="20px" />
          ) : (
            "Log In"
          )}
        </button>
        <span className="loginForgot">Forgot Password?</span>
        <button className="loginRegisterButton" disabled={isFetching}>
          {isFetching ? (
            <CircularProgress color="white" size="20px" />
          ) : (
            "Create a new Account"
          )}
        </button>
      </form>
    </div>
  );
}
