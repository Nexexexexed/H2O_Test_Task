import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFinancialChartLogic } from "../../utils/processingData";
import styles from "./FinancialChart.module.scss";

import { FinancialData } from "../../utils/generateData";

interface FinancialProps {
  data: FinancialData[];
  selectedCard: "total" | "b2b" | "b2c";
}

export const FinancialChart = ({ data, selectedCard }: FinancialProps) => {
  const { view, setView, activeLine, setActiveLine, chartData, totals } =
    useFinancialChartLogic(data, selectedCard);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.viewBlock}>
        <div className={styles.viewText}>Общая статистика</div>
        <div className={styles.viewSwitch}>
          <button
            onClick={() => setView("week")}
            className={view === "week" ? styles.active : ""}
          >
            Неделя
          </button>
          <button
            onClick={() => setView("month")}
            className={view === "month" ? styles.active : ""}
          >
            Месяц
          </button>
          <button
            onClick={() => setView("year")}
            className={view === "year" ? styles.active : ""}
          >
            Год
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              if (view === "year") {
                const [month] = date.split(".");
                const monthNames = [
                  "Янв",
                  "Фев",
                  "Мар",
                  "Апр",
                  "Май",
                  "Июн",
                  "Июл",
                  "Авг",
                  "Сен",
                  "Окт",
                  "Ноя",
                  "Дек",
                ];
                return monthNames[parseInt(month, 10) - 1];
              }
              return date;
            }}
          />
          <Tooltip
            contentStyle={{
              fontWeight: "600",
              fontSize: "18px",
              letterSpacing: "-0.56px",
              border: "1px solid #54D3C2",
              borderRadius: "8px",
              backgroundColor: "#fff",
              padding: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            labelFormatter={() => ""}
            formatter={(value: number | string, name: string) => {
              if (name === activeLine || activeLine === null) {
                return `₽ ${[
                  new Intl.NumberFormat("ru-RU").format(Number(value)),
                ]}`;
              }
              return [null, null];
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#73CF7A"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Выручка"
            onMouseEnter={() => setActiveLine("Выручка")}
            onMouseLeave={() => setActiveLine(null)}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#30C7DC"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Затраты"
            onMouseEnter={() => setActiveLine("Затраты")}
            onMouseLeave={() => setActiveLine(null)}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#45AAF2"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Прибыль"
            onMouseEnter={() => setActiveLine("Прибыль")}
            onMouseLeave={() => setActiveLine(null)}
          />
          <Line
            type="monotone"
            dataKey="debt"
            stroke="#F5E230"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Задолженность"
            onMouseEnter={() => setActiveLine("Задолженность")}
            onMouseLeave={() => setActiveLine(null)}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#AC74FC"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={800}
            name="Итог"
            onMouseEnter={() => setActiveLine("Итог")}
            onMouseLeave={() => setActiveLine(null)}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.summary}>
        <div className={styles.text}>
          <li className={`${styles.circle} ${styles.revenue}`}></li>
          <div>
            <div className={styles.text_name}> Выручка</div>
            <div className={styles.text_amount}>
              ₽ {totals.revenue.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <li className={`${styles.circle} ${styles.expenses}`}></li>
          <div>
            <div className={styles.text_name}> Затраты</div>
            <div className={styles.text_amount}>
              ₽ {totals.expenses.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <li className={`${styles.circle} ${styles.income}`}></li>
          <div>
            <div className={styles.text_name}> Прибыль</div>
            <div className={styles.text_amount}>
              ₽ {totals.income.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <li className={`${styles.circle} ${styles.debt}`}></li>
          <div>
            <div className={styles.text_name}> Задолженность </div>
            <div className={styles.text_amount}>
              ₽ {totals.debt.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <li className={`${styles.circle} ${styles.total}`}></li>
          <div>
            <div className={styles.text_name}> Итог </div>
            <div className={styles.text_amount}>
              ₽ {totals.total.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
