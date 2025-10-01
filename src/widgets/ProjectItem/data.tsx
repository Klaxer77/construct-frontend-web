import { Icon, StatusItem, type Column } from "../../shared";

interface ObjectItem {
  number?: number;
  stage: string;
  startDate: string;
  endDate: string;
  responsible: string;
  status: "finished" | "atWork";
}

export const data: ObjectItem[] = [
  {
    stage: "Устройство бортового камня",
    startDate: "15.04.24",
    endDate: "27.04.24",
    responsible: "Пермяков А.А",
    status: "finished" as const,
  },
  {
    stage: "Устройство бортового камня",
    startDate: "15.04.24",
    endDate: "27.04.24",
    responsible: "Пермяков А.А",
    status: "finished" as const,
  },
  {
    stage: "Устройство бортового камня",
    startDate: "15.04.24",
    endDate: "27.04.24",
    responsible: "Пермяков А.А",
    status: "atWork" as const,
  },
];

const statusMap = {
  finished: { text: "Завершен", color: "green" },
  atWork: { text: "В работе", color: "blue" },
} as const;

export const columns: Column<ObjectItem>[] = [
  {
    key: "number",
    title: "№",
    render: (_value, _row, index) => index + 1,
  },
  { key: "stage", title: "Этап" },
  { key: "startDate", title: "Дата начала" },
  { key: "endDate", title: "Дата окончания" },
  {
    key: "responsible",
    title: "Ответственный",
    render: (value) => (
      <div className="flex items-center gap-[14px]">
        {value}
        <Icon name="Share" color="#007AFF" />
      </div>
    ),
  },
  {
    key: "status",
    title: "Статус",
    render: (value) => {
      const { text, color } = statusMap[value as keyof typeof statusMap];
      return <StatusItem text={text} status={color} />;
    },
  },
];
