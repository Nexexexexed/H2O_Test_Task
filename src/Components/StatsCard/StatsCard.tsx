import { FinancialData } from "../../utils/generateData";
import styles from "./StatsCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface StatsCardProps {
  title: string;
  data: FinancialData[];
  mode: "total" | "b2b" | "b2c";
  percentage: number;
  isSelected: boolean;
  onClick: () => void;
}

const StatsCard = ({
  title,
  data,
  mode,
  percentage,
  isSelected,
  onClick,
}: StatsCardProps) => {
  const calculateValue = () => {
    const filtered = data.filter((item) => {
      if (mode === "b2b") return item.division === "B2B";
      if (mode === "b2c") return item.division === "B2C";
      return true;
    });
    return filtered.reduce((sum, item) => sum + item.amount, 0);
  };

  const value = calculateValue();

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ""} ${
        percentage >= 0 ? styles.positive : styles.negative
      }`}
      onClick={onClick}
    >
      <div
        className={`${styles.percentage_block} ${
          percentage >= 0 ? styles.positive : styles.negative
        } ${isSelected ? styles.selected : ""}`}
      >
        <div
          className={`${styles.percentage} ${
            percentage >= 0 ? styles.positive : styles.negative
          } ${isSelected ? styles.selected : ""}`}
        >
          <FontAwesomeIcon
            icon={percentage >= 0 ? faArrowUp : faArrowDown}
            className={styles.arrow}
          />{" "}
          {Math.abs(percentage)}%
        </div>
      </div>

      <div
        className={`${styles.card_value} ${isSelected ? styles.selected : ""}`}
      >
        ₽ {value.toLocaleString("ru-RU").replace(/,/g, " ")}
      </div>
      <div
        className={`${styles.card_title} ${isSelected ? styles.selected : ""}`}
      >
        {title}
      </div>
    </button>
  );
};

export default StatsCard;
