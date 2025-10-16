export const tabs = [
  { label: "Все", value: "all" },
  { label: "Жилые", value: "residential" },
  { label: "Общественные", value: "public" },
  { label: "Промышленные", value: "industrial" },
  { label: "Инфраструктурные", value: "infrastructure" },
  { label: "Благоустройство", value: "improvement" },
  { label: "Энергетика", value: "energy" },
];

interface Column<T> {
  key: keyof T;
  title?: string;
}

export interface ObjectItem {
  number?: number;
  name: string;
  id: string;
  city: string;
  status: "advance" | "according" | "late" | "unknown" | "needsAct";
  responsible: string;
  deadline: string;
  actions?: string;
  category:
    | "residential"
    | "public"
    | "industrial"
    | "infrastructure"
    | "improvement"
    | "energy";
}

export const columns: Column<ObjectItem>[] = [
  { key: "number", title: "№" },
  { key: "name", title: "Название" },
  { key: "id", title: "ID Объекта" },
  { key: "city", title: "Город" },
  { key: "status", title: "Статус" },
  { key: "responsible", title: "Ответственный" },
  { key: "deadline", title: "Дата сдачи" },
  {
    key: "actions",
    title: "",
  },
];
