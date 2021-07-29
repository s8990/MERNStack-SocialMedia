import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export default function RegisterRight() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: username.current.value,
        password: username.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="registerRight">
      <form className="registerBox" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          required
          ref={username}
          className="registerInput"
        />
        <input
          placeholder="Email"
          type="email"
          required
          ref={email}
          className="registerInput"
        />
        <input
          placeholder="Password"
          type="password"
          required
          ref={password}
          className="registerInput"
          minLength="6"
        />
        <input
          placeholder="Confirm Password"
          type="password"
          required
          ref={confirmPassword}
          className="registerInput"
        />
        <button className="registerButton" type="submit">
          Sign Up
        </button>
        <button className="registerRegisterButton">Log In</button>
      </form>
    </div>
  );
}
