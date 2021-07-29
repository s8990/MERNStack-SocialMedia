import "./styles.css";
import PostTop from "./PostTop";
import PostCenter from "./PostCenter";
import PostBottom from "./PostBottom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <PostTop post={post} />
        <PostCenter post={post} />
        <PostBottom post={post} />
      </div>
    </div>
  );
}
