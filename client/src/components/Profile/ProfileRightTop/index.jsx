import "./styles.css";

export default function ProfileRightTop({ user }) {
  return (
    <div className="profileRightTop">
      <div className="profileCover">
        <img
          className="profileCoverImg"
          src={`${process.env.REACT_APP_PUBLIC_FOLDER}${user?.coverPicture}`}
          alt=""
        />
        <img
          className="profileUserImg"
          src={`${process.env.REACT_APP_PUBLIC_FOLDER}${user?.profilePicture}`}
          alt=""
        />
      </div>
      <div className="prfileInfo">
        <h4 className="profileInfoName">{user?.username}</h4>
        <span className="profileInfoDescription">{user?.description}</span>
      </div>
    </div>
  );
}
