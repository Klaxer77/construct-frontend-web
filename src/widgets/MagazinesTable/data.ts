interface Column<T> {
  key: keyof T;
  title?: string;
}

interface ObjectItem {
  name: string;
  responsible: string;
  date: string;
  status: string;
  id: string;
  action?: string;
}

export const data: ObjectItem[] = [
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
  {
    name: "Общий журнал работ",
    responsible: "Липин В.А",
    date: "24.12.2020",
    status: "Норма",
    id: "ASTRA-0523-001",
  },
];

export const columns: Column<ObjectItem>[] = [
  { key: "name", title: "Название" },
  { key: "responsible", title: "Ответственный" },
  { key: "date", title: "Дата редактирования" },
  { key: "status", title: "Статус" },
  { key: "id", title: "Номер журнала" },
  { key: "action", title: "Действие" },
];
