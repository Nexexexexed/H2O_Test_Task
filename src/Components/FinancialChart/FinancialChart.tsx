import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FinancialData } from "../../utils/generateData";
import styles from "./FinancialChart.module.scss";
import { format } from "date-fns";

interface FinancialProps {
  data: FinancialData[];
  selectedCard: "total" | "b2b" | "b2c";
}

type ViewMode = "month" | "week" | "year";

interface ChartDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  income: number;
  debt: number;
  total: number;
}

const FinancialChart = ({ data, selectedCard }: FinancialProps) => {
  const [view, setView] = useState<ViewMode>("month");
  const [activeLine, setActiveLine] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) => {
      if (selectedCard === "total") return true;
      return item.division.toLowerCase() === selectedCard;
    });

    const now = new Date();
    const compareDate = (dateStr: string) => {
      const d = new Date(dateStr);
      const diff = now.getTime() - d.getTime();
      if (view === "week") return diff <= 7 * 24 * 60 * 60 * 1000;
      if (view === "month") return diff <= 30 * 24 * 60 * 60 * 1000;
      if (view === "year") return diff <= 365 * 24 * 60 * 60 * 1000;
      return true;
    };

    return filtered.filter((d) => compareDate(d.date));
  }, [data, selectedCard, view]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    const grouped = new Map<string, { [key: string]: number }>();

    filteredData.forEach((item) => {
      const dateKey =
        view === "year"
          ? format(new Date(item.date), "MM.yyyy")
          : format(new Date(item.date), "dd.MM");

      const existing = grouped.get(dateKey) || {
        expenses: 0,
        income: 0,
        revenue: 0,
        debt: 0,
      };
      existing[item.type] += item.amount;
      grouped.set(dateKey, existing);
    });

    return Array.from(grouped.entries())
      .sort(([a], [b]) => {
        const aDate =
          view === "year"
            ? new Date(`01.${a}`)
            : new Date(a.split(".").reverse().join("."));
        const bDate =
          view === "year"
            ? new Date(`01.${b}`)
            : new Date(b.split(".").reverse().join("."));
        return aDate.getTime() - bDate.getTime();
      })
      .map(([date, types]) => ({
        date,
        revenue: types.revenue || 0,
        expenses: types.expenses || 0,
        income: types.income || 0,
        debt: types.debt || 0,
        total:
          (types.revenue || 0) +
          (types.expenses || 0) +
          (types.income || 0) +
          (types.debt || 0),
      }));
  }, [filteredData, view]);

  const totals = useMemo(() => {
    return chartData.reduce<ChartDataPoint>(
      (acc, item) => {
        acc.revenue += item.revenue;
        acc.expenses += item.expenses;
        acc.income += item.income;
        acc.debt += item.debt;
        acc.total += item.total;
        return acc;
      },
      { revenue: 0, expenses: 0, income: 0, debt: 0, total: 0, date: "" }
    );
  }, [chartData]);

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

export default FinancialChart;
