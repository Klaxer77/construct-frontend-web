import { Icon, StatusItem, type Column } from "../../shared";

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

interface ObjectItem {
  number?: number;
  name: string;
  adress: string;
  value: number;
  system: string;
  kpgz: string;
  start: string;
  end: string;
  done: number;
  status: string;
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
    done: 27,
    status: "work",
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
  {
    key: "done",
    title: "Прогресс",
    render: (value) => (
      <p
        className={`font-[700] text-[14px] leading-[12px] tracking-[-0.28px] ${
          value === 100
            ? "text-[#00691E]"
            : value === 0
            ? "text-[#808080]"
            : "text-blueSideBarActive"
        }`}
      >
        {value}%
      </p>
    ),
  },
  {
    key: "status",
    title: "Статус",
    render: () => (
      <div className="flex flex-col gap-[6px]">
        <StatusItem text="В работе" status="blue" />
        <div className="rounded-[4px] bg-[#FFF2D4]  flex items-center justify-center ">
          <p className=" text-[#735400] font-[600] text-[14px] leading-[24px] tracking-[-0.4px] w-[68px]">
            Требует проверки
          </p>
        </div>
      </div>
    ),
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
  planned: "bg-purple",
};

export const lightStatusColors = {
  done: "bg-lightGreen",
  inprogress: "bg-lightBlue",
  upcoming: "bg-lightOrange",
  planned: "bg-lightPurple",
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
