import "./styles.css";

export default function RightBarFriendsItem({ user }) {
  return (
    <li className="rightBarFriend">
      <div className="rightBarProfileImgContainer">
        <img className="rightBarProfileImg" src={user?.profilePicture} alt="" />
        {user?.isOnline && <span className="rightBarOnline"></span>}
      </div>
      <span className="rightBarUsername">{user?.username}</span>
    </li>
  );
}
