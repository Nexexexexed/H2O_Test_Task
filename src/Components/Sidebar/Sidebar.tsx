import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faListAlt,
  faArchive,
  faUserFriends,
  faCoins,
  faChartPie,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [usingSidebar, setusingSidebar] = useState("faChartPie");
  return (
    <nav className={styles.sidebar}>
      <img src="/public/Group.png"></img>
      <div className={styles.group_ico}>
        <button
          className={usingSidebar === "faCalendarAlt" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faCalendarAlt");
          }}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faListAlt" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faListAlt");
          }}
        >
          <FontAwesomeIcon icon={faListAlt} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faArchive" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faArchive");
          }}
        >
          <FontAwesomeIcon icon={faArchive} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faUserFriends" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faUserFriends");
          }}
        >
          <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faCoins" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faCoins");
          }}
        >
          <FontAwesomeIcon icon={faCoins} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faChartPie" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faChartPie");
          }}
        >
          <FontAwesomeIcon icon={faChartPie} className={styles.icon} />
        </button>
        <button
          className={usingSidebar === "faCog" ? `${styles.active}` : ""}
          onClick={() => {
            setusingSidebar("faCog");
          }}
        >
          <FontAwesomeIcon icon={faCog} className={styles.icon} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
