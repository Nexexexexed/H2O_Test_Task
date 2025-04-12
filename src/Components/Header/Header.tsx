import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const tabs = [
    "Свод данных по сотрудникам",
    "Сводный отчет внутри компании",
    "Сводный отчет по сделкам",
  ];
  const [activeTab, setActiveTab] = useState(1);
  const tabRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % tabs.length);
  };

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeTab]!;
      const underline = document.querySelector(
        `.${styles.underline}`
      ) as HTMLElement;
      if (underline) {
        underline.style.width = `${offsetWidth}px`;
        underline.style.left = `${offsetLeft}px`;
      }
    }
  }, [activeTab]);

  return (
    <header className={styles.header}>
      <div className={styles.header_nav}>
        <button onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className={styles.header_tabs}>
        <div className={styles.tab_container}>
          {tabs.map((tab, index) => (
            <span
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`${styles.tab} ${
                activeTab === index ? styles.active : ""
              }`}
            >
              {tab}
            </span>
          ))}
          <div
            className={styles.underline}
            style={{
              width: tabRefs.current[activeTab]?.offsetWidth || 0,
              left: tabRefs.current[activeTab]?.offsetLeft || 0,
            }}
          />
        </div>
      </div>

      <div className={styles.header_profile}>
        <div className={styles.header_avatar}>
          <img src="/avatar.png" alt="avatar" />
        </div>
        <div className={styles.text}>
          <div className={styles.nickname}>Kristina 🐰</div>
          <div className={styles.post}>менеджер продаж</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
