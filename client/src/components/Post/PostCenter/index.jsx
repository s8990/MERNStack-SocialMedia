import "./styles.css";

export default function Index({ post }) {
  return (
    <div className="postCenter">
      <span className="postText">{post?.description}</span>
      <img
        className="postImg"
        src={`${process.env.REACT_APP_PUBLIC_FOLDER}${post?.picture}`}
        alt=""
      />
    </div>
  );
}
