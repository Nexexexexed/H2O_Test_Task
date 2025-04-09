import styles from "./ProblemAreas.module.scss";
import { generateProblemAreas } from "../../utils/generateData";

const problemAreasMass = generateProblemAreas();

const getIconColor = (count: number): "danger" | "warning" | null => {
  if (count > 50000) return "danger";
  if (count > 10000) return "warning";
  return null;
};

const ProblemAreas = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Проблемные зоны</h3>
      <ul className={styles.list}>
        {problemAreasMass.map(({ area, count }, index) => {
          const color = getIconColor(count);

          return (
            <li key={index} className={styles.listItem}>
              {color && (
                <div className={`${styles.iconContainer} ${styles[color]}`}>
                  !
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.areaName}>{area}</div>
                <div className={styles.amount}>
                  ₽ {count.toLocaleString("ru-RU").replace(/,/g, " ")}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProblemAreas;
