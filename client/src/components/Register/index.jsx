import "./styles.css";
import RegisterLeft from "./RegisterLeft";
import RegisterRight from "./RegisterRight";

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <RegisterLeft />
        <RegisterRight />
      </div>
    </div>
  );
}
