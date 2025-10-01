import { format, parseISO } from "date-fns";
import { ObjectMap } from "../../widgets/ObjectMap/ObjectMap";
interface ResponsibleUser {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  email: string;
  fio: string;
  role: string;
}
interface Data {
  id: string;
  using_id: string;
  status: string;
  object_type: string;
  created_at: string;
  updated_at: string;
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string;
  start_date: string;
  coords: number[][][] | number[][];
  responsible_user: ResponsibleUser;
}

interface GeneralBlockProps {
  data?: Data;
}

export const GeneralBlock = ({ data }: GeneralBlockProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return format(parseISO(dateString), "dd.MM.yyyy");
    } catch {
      return "—";
    }
  };
  const data1 = [
    {
      title: "Название объекта",
      text: data?.title,
    },
    {
      title: "Наименование и адрес объекта | Общие сведения",
      text: data?.general_info,
    },
    {
      title: "Местоположение",
      text: data?.city,
    },
    {
      title: "Технический заказчик",
      text: "Описание текст текст текст",
    },
    {
      title: "Застройщик (Адрес)",
      text: "Не выбран",
    },
    {
      title: "Лицо, осуществляющее подготовку проектной документации",
      text: "Общество с ограниченной ответственностью «Мезонин» (ООО «Мезонин»)",
    },
    {
      title:
        "Лицо, осуществляющее строительство, реконструкцию, капитальный ремонт",
      text: "Общество с ограниченной ответственностью «Приоритет» (ООО «Приоритет»). Ассоциация СРО «СТРОЙГАРАНТ» (СРО-С-120-17122009 ИНН 5905270972) №899 от 20.04.2018",
    },
  ];
  const data2 = [
    {
      title: "Старт объекта",
      text: formatDate(data?.start_date),
    },
    {
      title: "Окончание проекта",
      text: formatDate(data?.date_delivery_verification),
    },
    {
      title: "Тип",
      text: "Выборочный капитальный ремонт",
    },
    {
      title: "Координаты",
      text: (
        <span>
          {data?.coords.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </span>
      ),
    },
    {
      title: "Застройщик",
      text: "Не выбран",
    },
    {
      title: "Застройщик (Наименование)",
      text: "Не выбран",
    },
    {
      title: "Адрес",
      text: "614015, г. Пермь, ул. Луначарского, 56, офис 222; свидетельство серии 59 № 001766410 от 03.12.2002 о внесении записи в ЕГРЮЛ, ОГРН 1025900525045, ИНН 5902139169, тел./факс (342)280-97-58, тел. 89129864520",
    },
    {
      title: "Адрес",
      text: "ОГРН 1025900772314, ИНН 5903000378, 614065, г. Пермь, ул. К. Беляева, д. 35, кв. 99, тел. +79048453755",
    },
  ];

  const normalizeCoords = (
    coords?: number[][] | number[][][]
  ): number[][][] => {
    if (!coords) return [];
    if (Array.isArray(coords[0]) && typeof coords[0][0] === "number") {
      return [coords as number[][]]; // number[][] → number[][][]
    }
    return coords as number[][][];
  };
  return (
    <div className="flex flex-col gap-[32px]">
      <ObjectMap coords={normalizeCoords(data?.coords)} readOnly />

      <div className="flex justify-between gap-[50px]">
        <div className="flex flex-col gap-[20px]">
          {data1.map((item, index) => (
            <div key={index} className="flex flex-col gap-[12px]">
              <h2 className="font-[700] text-[18px] leading-[18px] tracking-[-0.4px] text-[#3D3D3D]">
                {item.title}
              </h2>
              <div className="font-[600] text-[16px] leading-[24px] tracking-[-0.4px] text-[#00000080]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[20px]">
          {data2.map((item, index) => (
            <div key={index} className="flex flex-col gap-[12px]">
              <h2 className="font-[700] text-[18px] leading-[18px] tracking-[-0.4px] text-[#3D3D3D]">
                {item.title}
              </h2>
              <div className="font-[600] text-[16px] leading-[24px] tracking-[-0.4px] text-[#00000080]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
