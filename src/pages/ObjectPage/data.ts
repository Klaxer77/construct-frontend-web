interface infoDataTypes {
  title: string;
  subtitle: string;
  status: "fast" | "stable";
  text: string;
}

export const infoData: infoDataTypes[] = [
  {
    title: "126",
    subtitle: "Сотрудников",
    status: "stable",
    text: "Учавствуют в проекте",
  },
  {
    title: "7",
    subtitle: "Активных журналов",
    status: "stable",
    text: "Учавствуют в проекте",
  },
  {
    title: "9",
    subtitle: "Запрос на материалы",
    status: "stable",
    text: "Статус: Нормальный",
  },
  {
    title: "156",
    subtitle: "Выполненных задач",
    status: "fast",
    text: "Статус: Срочно",
  },
];

export const tabs = [
  { label: "Общее", value: "general" },
  { label: "Замечания", value: "remarks" },
  { label: "Нарушения", value: "violations" },
  { label: "Ход работ", value: "progress" },
  { label: "Задачи", value: "tasks" },
  { label: "Сотрудники", value: "employees" },
  { label: "Журналы", value: "magazine" },
];

export const columns = [
  { key: "name", title: "Объект" },
  { key: "data", title: "Дата замечания" },
  { key: "term", title: "Срок до" },
  { key: "responsible", title: "Ответственный" },
  { key: "status", title: "Статус" },
  {
    key: "actions",
    title: "Действие",
  },
];
