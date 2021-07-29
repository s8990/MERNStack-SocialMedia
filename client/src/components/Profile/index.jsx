import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import "./styles.css";

import TopBar from "../../layout/TopBar";
import Sidebar from "../../layout/Sidebar";
import ProfileRightTop from "./ProfileRightTop";
import ProfileRightBottom from "./ProfileRightBottom";

export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <ProfileRightTop user={user} />
          <ProfileRightBottom user={user} />
        </div>
      </div>
    </>
  );
}
