import type { ObjectItem } from "./ProgressTab";

export const tasks = [
  {
    name: "Фундаментные работы",
    start: "2025-04-01",
    end: "2025-04-30",
    status: "done" as const,
    done: 27,
  },
  {
    name: "Структурные работы",
    start: "2025-04-16",
    end: "2025-07-26",
    status: "inprogress" as const,
    done: 100,
  },
  {
    name: "Инженерные работы",
    start: "2025-06-23",
    end: "2025-08-27",
    status: "upcoming" as const,
    done: 0,
  },
];

export const dataTable: ObjectItem[] = [
  {
    title: "Устройство садового бортового камня в рамках благоустройства территории",
    volume: 895.0,
    unit: "Погонный метр",
    kpgz: "02.03.03.11",
    date_from: "15.04.24",
    date_to: "27.04.24",
    percent: 27,
    status_main: "work",
    status_second: 'none'
  },
];

export const colorsExpl = [
  {
    text: "Выполнено",
    color: "bg-green",
  },
  {
    text: "В работе",
    color: "bg-blue",
  },
  {
    text: "Предстоящие",
    color: "bg-orange",
  },
  {
    text: "Запланировано",
    color: "bg-purple",
  },
];

export const statusColors = {
  done: "bg-green",
  inprogress: "bg-blue",
  upcoming: "bg-orange",
  not_started: "bg-purple",
};

export const lightStatusColors = {
  done: "bg-lightGreen",
  inprogress: "bg-lightBlue",
  upcoming: "bg-lightOrange",
  not_started: "bg-lightPurple",
};

export const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const buttons = [
  {
    id: "general",
    text: "Общий график",
  },
  {
    id: "change",
    text: "Изменение графика работ",
  },
];
