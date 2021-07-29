import "./styles.css";

import Feed from "../../../layout/Feed";
import RightBar from "../../../layout/RightBar";

export default function ProfileRightBottom({ user }) {
  return (
    <div className="profileRightBottom">
      <Feed username={user?.username} />
      <RightBar user={user} />
    </div>
  );
}
