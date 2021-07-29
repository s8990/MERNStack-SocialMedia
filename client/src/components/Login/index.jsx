import "./styles.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  );
}
