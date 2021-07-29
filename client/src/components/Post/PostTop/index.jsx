import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { MoreVert } from "@material-ui/icons";
import "./styles.css";

export default function PostTop({ post }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post?.userId}`);
      console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="postTop">
      <div className="postTopLeft">
        <Link to={`/profile/${user?.username}`}>
          <img
            className="postProfileImage"
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}${user?.profilePicture}`}
            alt=""
          />
        </Link>
        <span className="postUsername">{user?.username}</span>
        <span className="postDate">{format(post?.createdAt)}</span>
      </div>
      <div className="postTopRight">
        <MoreVert />
      </div>
    </div>
  );
}
