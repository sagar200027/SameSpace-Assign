import { useDispatch, useSelector } from "react-redux";
import { tab } from "../redux/Reducers";
import "./sideBar.css";

import React from "react";

const SideBar = () => {
  const selectedTab = useSelector((state) => state.selectedTab);
  const dispatch = useDispatch();

  const handleClick = (tabId) => {
    dispatch(tab(tabId));
  };

  return (
    <div>
      {/* <Sidebar bgColor="black" isCollapsed={false}> */}
      <img className="imgee" src={require("../images/Spotify.png")} />

      <div className="bgColorItem">
        <div
          className={`${selectedTab === 1 ? "selectedTab" : "unselectedTab"}`}
          onClick={() => handleClick(1)}
        >
          <p className="tabText">For You</p>
        </div>
        <div
          className={`${selectedTab === 2 ? "selectedTab" : "unselectedTab"}`}
          onClick={() => handleClick(2)}
        >
          <p className="tabText">Top Tracks</p>
        </div>
        <div
          className={`${selectedTab === 3 ? "selectedTab" : "unselectedTab"}`}
          onClick={() => handleClick(3)}
        >
          <p className="tabText">Favourites</p>
        </div>
        <div
          className={`${selectedTab === 4 ? "selectedTab" : "unselectedTab"}`}
          onClick={() => handleClick(4)}
        >
          <p className="tabText">Recently Played</p>
        </div>
      </div>
      {/* </Sidebar> */}
    </div>
  );
};

export default SideBar;
