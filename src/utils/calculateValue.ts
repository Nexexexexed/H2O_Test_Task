import { FinancialData } from "./generateData";
export const calculateValue = (
  mode: "total" | "b2b" | "b2c",
  data: FinancialData[]
) => {
  const filtered = data.filter((item) => {
    if (mode === "b2b") return item.division === "B2B";
    if (mode === "b2c") return item.division === "B2C";
    return true;
  });
  return filtered.reduce((sum, item) => sum + item.amount, 0);
};
