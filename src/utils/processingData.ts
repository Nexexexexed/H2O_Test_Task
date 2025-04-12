// useFinancialChartLogic.ts
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { FinancialData } from "./generateData";

type ViewMode = "month" | "week" | "year";

interface ChartDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  income: number;
  debt: number;
  total: number;
}

export const useFinancialChartLogic = (
  data: FinancialData[],
  selectedCard: "total" | "b2b" | "b2c"
) => {
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

  return {
    view,
    setView,
    activeLine,
    setActiveLine,
    chartData,
    totals,
  };
};
