import { subMonths } from "date-fns";

type Division = "B2B" | "B2C";
type OperationType = "expenses" | "income" | "revenue" | "debt";

export interface FinancialData {
  division: Division;
  date: string;
  amount: number;
  type: OperationType;
}

const OPERATION_TYPES: OperationType[] = [
  "expenses",
  "income",
  "revenue",
  "debt",
];

export const generateData = (): FinancialData[] => {
  const data: FinancialData[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = subMonths(now, i);

    data.push({
      division: "B2B",
      date: date.toISOString(),
      amount: Math.floor(Math.random() * 1000000) - 500000,
      type: OPERATION_TYPES[Math.floor(Math.random() * OPERATION_TYPES.length)],
    });

    data.push({
      division: "B2C",
      date: date.toISOString(),
      amount: Math.floor(Math.random() * 1000000) - 500000,
      type: OPERATION_TYPES[Math.floor(Math.random() * OPERATION_TYPES.length)],
    });
  }

  return data;
};

export interface ProblemArea {
  area: string;
  count: number;
}

const PROBLEM_AREAS = [
  "Линейный персонал",
  "Подразделение разовых работ ФОТ",
  "Бензин (наличные)",
  "Закупка инвентаря",
  "Закупка спецодежды/СИЗ",
  "Ремонт оборудования",
  "Обслуживание автомобиля",
  "Форс-мажоры",
  "Рекламные бюджеты (Блогеры)",
  "Рекламные бюджеты (Контекст)",
];

export const generateProblemAreas = (): ProblemArea[] => {
  return PROBLEM_AREAS.filter(() => Math.random() > 0.3).map((area) => ({
    area,
    count: Math.floor(Math.random() * 50000 + 10000),
  }));
};
