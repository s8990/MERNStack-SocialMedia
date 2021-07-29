import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./styles.css";

export default function Index() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topBarLogo">Aban Social</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink">HomePage</span>
          <span className="topBarLink">Timeline</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarIconItem">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarIconItem">
            <Chat />
            <span className="topBarIconBadge">2</span>
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}${user?.profilePicture}`}
            alt=""
            className="topBarImg"
          />
        </Link>
      </div>
    </div>
  );
}
