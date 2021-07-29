import "./styles.css";

import TopBar from "../../layout/TopBar";
import Sidebar from "../../layout/Sidebar";
import Feed from "../../layout/Feed";
import RightBar from "../../layout/RightBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
