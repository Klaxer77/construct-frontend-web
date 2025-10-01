import { Icon, type Column } from "../../shared";

export const tasks = [
  {
    name: "Фундаментные работы",
    start: "2025-04-01",
    end: "2025-04-30",
    status: "done" as const,
  },
  {
    name: "Структурные работы",
    start: "2025-04-16",
    end: "2025-07-26",
    status: "inprogress" as const,
  },
  {
    name: "Инженерные работы",
    start: "2025-06-23",
    end: "2025-08-27",
    status: "upcoming" as const,
  },
];

interface ObjectItem {
  number?: number;
  name: string;
  adress: string;
  value: number;
  system: string;
  kpgz: string;
  start: string;
  end: string;
}

export const dataTable: ObjectItem[] = [
  {
    name: "Устройство садового бортового камня в рамках благоустройства территории",
    adress: "Проспект Мира 194",
    value: 895.0,
    system: "Погонный метр",
    kpgz: "02.03.03.11",
    start: "15.04.24",
    end: "27.04.24",
  },
];

export const columns: Column<ObjectItem>[] = [
  {
    key: "number",
    title: "№",
    render: (_value, _row, index) => (
      <p className="font-[800] text-[#413F3F]">{index + 1}</p>
    ),
  },
  { key: "name", title: "Наименование работы" },
  { key: "adress", title: "Адрес" },
  { key: "value", title: "Объем" },
  { key: "system", title: "Единица измерения" },
  { key: "kpgz", title: "КПГЗ" },
  {
    key: "start",
    title: "Начало",
    render: (value) => (
      <div className="flex items-center gap-[14px]">
        {value}
        <Icon name="Edit" />
      </div>
    ),
  },
  {
    key: "end",
    title: "Окончание",
    render: (value) => (
      <div className="flex items-center gap-[14px]">
        {value}
        <Icon name="Edit" />
      </div>
    ),
  },
];
