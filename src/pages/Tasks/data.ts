interface infoDataTypes {
  title: string;
  subtitle: string;
  status: "fast" | "stable";
  text: string;
}

export interface ObjectItem {
  number?: number;
  name: string;
  id: string;
  city: string;
  status: "advance" | "according" | "late";
  activeTasks: number;
  deadline: string;
  actions?: string;
}

export const infoData: infoDataTypes[] = [
  {
    title: "ЖК Астра",
    subtitle: "27 задач",
    status: "fast",
    text: "Аракелян В.Г",
  },
  {
    title: "ЖК Доминант",
    subtitle: "57 задач",
    status: "fast",
    text: "Аракелян В.Г",
  },
];

export const dataTable: ObjectItem[] = [
  {
    name: "ЖК “Астра”",
    id: "OBJ-001",
    city: "Москва",
    status: "according",
    activeTasks: 27,
    deadline: "01.12.2025",
  },
  {
    name: "ТРЦ Мега",
    id: "OBJ-002",
    city: "Санкт-Петербург",
    status: "advance",
    activeTasks: 27,
    deadline: "15.11.2025",
  },
  {
    name: "ЖК “Салют“",
    id: "OBJ-001",
    city: "Москва",
    status: "late",
    activeTasks: 27,
    deadline: "01.12.2025",
  },
  {
    name: "ТРЦ Мега",
    id: "OBJ-002",
    city: "Санкт-Петербург",
    status: "advance",
    activeTasks: 27,
    deadline: "15.11.2025",
  },
  {
    name: "ЖК “Салют“",
    id: "OBJ-001",
    city: "Москва",
    status: "according",
    activeTasks: 27,
    deadline: "01.12.2025",
  },
];

interface Column<T> {
  key: keyof T;
  title?: string;
}

export const columns: Column<ObjectItem>[] = [
  { key: "number", title: "№" },
  { key: "name", title: "Название" },
  { key: "id", title: "ID Объекта" },
  { key: "city", title: "Город" },
  { key: "status", title: "Статус" },
  { key: "activeTasks", title: "Активных задач" },
  { key: "deadline", title: "Дата сдачи" },
  {
    key: "actions",
    title: "",
  },
];
