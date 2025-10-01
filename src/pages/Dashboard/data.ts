interface infoTypes {
  title: string;
  subtitle: string;
  status: "stable" | "fast";
  currency?: boolean;
  text: string;
}

export const infoItems: infoTypes[] = [
  {
    title: "1340239000",
    subtitle: "Общий бюджет",
    status: "stable",
    currency: true,
    text: "Статус: Стабильно",
  },
  {
    title: "175",
    subtitle: "Количество сотрудников",
    status: "stable",
    text: "Статус: Стабильно",
  },
  {
    title: "54",
    subtitle: "Активных задач",
    status: "fast",
    text: "Статус: Срочно",
  },
];

interface attentionDataTypes {
  id: string;
  name: string;
  project: string;
  responsible: string;
  status: "low" | "mid" | "high";
}

export const attentionData: attentionDataTypes[] = [
  {
    id: "1",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "low",
  },
  {
    id: "2",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "mid",
  },
  {
    id: "3",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "high",
  },
  {
    id: "4",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "low",
  },
  {
    id: "5",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "mid",
  },
  {
    id: "6",
    name: "Журнал бетонных работ",
    project: 'ЖК "Астра"',
    responsible: "Липин В.А",
    status: "high",
  },
];

interface actionsDataTypes {
  text: string;
  status: "users" | "workLog" | "materials";
  time: string;
  owner: "me" | "employee";
}

export const actionsData: actionsDataTypes[] = [
  {
    text: "Добавление сотрудника",
    status: "users",
    time: "14:30",
    owner: "me",
  },
  {
    text: "Запись в журнал общих работ",
    status: "workLog",
    time: "14:30",
    owner: "me",
  },
  {
    text: "Добавление стройматериалов",
    status: "materials",
    time: "14:30",
    owner: "me",
  },
  {
    text: "Добавление сотрудника",
    status: "users",
    time: "14:30",
    owner: "me",
  },
  {
    text: "Запись в журнал общих работ",
    status: "workLog",
    time: "14:30",
    owner: "employee",
  },
  {
    text: "Добавление стройматериалов",
    status: "materials",
    time: "14:30",
    owner: "employee",
  },
  {
    text: "Добавление сотрудника",
    status: "users",
    time: "14:30",
    owner: "employee",
  },
  {
    text: "Запись в журнал общих работ",
    status: "workLog",
    time: "14:30",
    owner: "employee",
  },
  {
    text: "Добавление стройматериалов",
    status: "materials",
    time: "14:30",
    owner: "employee",
  },
];
