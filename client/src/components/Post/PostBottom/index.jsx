import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/Auth/AuthContext";
import axios from "axios";
import "./styles.css";

export default function PostBottom({ post }) {
  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [post.likes, currentUser?._id]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser?._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="postBottom">
      <div className="postBottomLeft">
        <img
          className="likeIcon"
          src="/assets/images/general/like.png"
          alt=""
          onClick={likeHandler}
        />
        <img
          className="likeIcon"
          src="/assets/images/general/heart.png"
          alt=""
          onClick={likeHandler}
        />
        <span className="postLikeCounter">{like} people like it</span>
      </div>
      <div className="postBottomRight">
        <span className="postCommentText">{post?.commentCount} comments</span>
      </div>
    </div>
  );
}
