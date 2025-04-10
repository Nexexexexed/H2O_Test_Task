import { useState, useEffect } from "react";
import { FinancialData, generateData } from "../../utils/generateData";
import ProblemAreas from "../ProblemAreas/ProblemAreas";
import StatsCard from "../StatsCard/StatsCard";
import FinancialChart from "../FinancialChart/FinancialChart";

import styles from "./styles.module.scss";

type CardType = "total" | "b2b" | "b2c";

const Dashboard = () => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType>("total");

  const [percentages] = useState(() => ({
    total: Math.floor(Math.random() * 201) - 100,
    b2b: Math.floor(Math.random() * 201) - 100,
    b2c: Math.floor(Math.random() * 201) - 100,
  }));

  useEffect(() => {
    setData(generateData());
  }, []);

  console.log(data);

  return (
    <main className={styles.main}>
      <div className={styles.main_block}>
        <div className={styles.stats_cards}>
          <StatsCard
            title="Итоги"
            data={data}
            mode="total"
            percentage={percentages.total}
            isSelected={selectedCard === "total"}
            onClick={() => setSelectedCard("total")}
          />
          <StatsCard
            title="B2B"
            data={data}
            mode="b2b"
            percentage={percentages.b2b}
            isSelected={selectedCard === "b2b"}
            onClick={() => setSelectedCard("b2b")}
          />
          <StatsCard
            title="B2C"
            data={data}
            mode="b2c"
            percentage={percentages.b2c}
            isSelected={selectedCard === "b2c"}
            onClick={() => setSelectedCard("b2c")}
          />
        </div>
        <FinancialChart data={data} selectedCard={selectedCard} />
      </div>
      <ProblemAreas />
    </main>
  );
};

export default Dashboard;
