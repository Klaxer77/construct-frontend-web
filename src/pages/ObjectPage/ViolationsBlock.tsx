import { useState } from "react";
import { Button, StatusItem } from "../../shared";
import { columns } from "./data";
import { useNavigate } from "react-router";
import { formatFio } from "../../shared/hooks/useFormatFIO";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { useAllViolations } from "../../shared/hooks/useViolations";
import { format, parseISO } from "date-fns";

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

interface RemarksBlockData {
  data?: Data;
}

export interface RemarkRow {
  name: string;
  data: string;
  term: string;
  responsible?: string;
  status: StatusKey;
  category: string;
}

const dataMap = {
  not_fixed: { statusText: "Активен", statusColor: "green" },
  fixed: { statusText: "Исправлено", statusColor: "greenDark" },
  review: { statusText: "На проверке", statusColor: "blue" },
} as const;

type StatusKey = keyof typeof dataMap;

type ButtonKey = "all" | "active" | "corrected" | "review";

const buttons: { id: ButtonKey; text: string }[] = [
  { id: "all", text: "Все" },
  { id: "active", text: "Активные" },
  { id: "corrected", text: "Исправленные" },
  { id: "review", text: "На проверке" },
];

export const ViolationsBlock = ({ data }: RemarksBlockData) => {
  const [activeButton, setActiveButton] = useState<ButtonKey>("all");
  const navigate = useNavigate();
  const { data: violations } = useAllViolations(data?.id ?? "");
  const { formatDate } = useFormatDate();

  const filteredRemarks =
    violations?.filter((row) => {
      switch (activeButton) {
        case "all":
          return true;
        case "active":
          return row.status === "not_fixed";
        case "corrected":
          return row.status === "fixed";
        case "review":
          return row.status === "review";
        default:
          return true;
      }
    }) ?? [];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-[10px]">
          {buttons.map((item) => (
            <Button
              key={item.id}
              text={item.text}
              onClick={() => setActiveButton(item.id)}
              style={activeButton === item.id ? "blue" : "white"}
            />
          ))}
        </div>
        <div className="flex items-center gap-[20px]">
          <p className="font-[700] text-[15px] leading-[22px] max-w-[290px] text-end">
            Создание и исправления замечаний доступно в мобильном приложении
          </p>
          <img
            className="w-[25px] h-[31px]"
            alt="picture"
            src="/img/mobile.png"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-[8px] mt-[30px]">
        <div
          className="grid items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
          }}
        >
          {columns.map((col, index) => (
            <div
              key={String(col.key) + index}
              className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-gray border-r border-borderGray last:border-0 h-full flex items-center"
            >
              {col.title || ""}
            </div>
          ))}
        </div>

        {filteredRemarks.map((row, index) => {
          const { statusText, statusColor } =
            dataMap[row.status as keyof typeof dataMap];
          const shortFio = formatFio(row.responsible_user_name);
          return (
            <div
              key={index}
              className="grid items-center border-b border-borderGray h-[64px]"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
              }}
            >
              <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] truncate">
                {row.object_name}
              </div>
              <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {formatDate(row.date_violation)} |{" "}
                {format(parseISO(row.date_violation), "HH:mm")}
              </div>
              <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {formatDate(row.expiration_date)}
              </div>
              <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {shortFio ?? "Неизвестно"}
              </div>
              <div className="px-[16px]">
                <StatusItem text={statusText} status={statusColor} />
              </div>
              {row.status !== "active" && (
                <div className="px-[16px] flex justify-end">
                  <Button
                    text="Открыть"
                    onClick={() =>
                      navigate(
                        `/objects/violation/${row.object_name}?id=${row.id}`
                      )
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
