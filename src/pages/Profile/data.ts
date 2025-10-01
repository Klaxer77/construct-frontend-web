interface infoDataTypes {
  title: string;
  subtitle: string;
  status: "fast" | "stable";
  text: string;
}

interface ObjectItem {
  data: string;
  action: string;
  project: string;
}

export const infoData: infoDataTypes[] = [
  {
    title: "19",
    subtitle: "Нарушений",
    status: "stable",
    text: "Статус: Стабильно",
  },
];


export const dataTable: ObjectItem[] = [
  {
    data: "24 авг. 2025",
    action: "Активация объекта",
    project: "ЖК “Астра”",
  },
  {
    data: "24 авг. 2025",
    action: "Замечание",
    project: "ЖК “Астра”",
  },
  {
    data: "24 авг. 2025",
    action: "Акт выполненных работ",
    project: "ЖК “Астра”",
  },
  {
    data: "24 авг. 2025",
    action: "Активация объекта",
    project: "ЖК “Астра”",
  },
  {
    data: "24 авг. 2025",
    action: "Активация объекта",
    project: "ЖК “Астра”",
  },

];