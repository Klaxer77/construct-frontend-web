import { useState } from "react";
import { Button, InfoItem, SearchInput, StatusItem } from "../../shared";
import { Header } from "../../widgets";
import { columns, dataTable, infoData } from "./data";
import { useNavigate } from "react-router";

const dataMap = {
  advance: { statusText: "Опережение", statusColor: "blue" },
  according: { statusText: "По плану", statusColor: "green" },
  late: { statusText: "Опоздание", statusColor: "red" },
} as const;

export const Tasks: React.FC = () => {
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Задачи"
        subtitle="Отслеживание задач для ваших объектов"
      ></Header>
      <p className="text-[#1C1C1C] font-[600] leading-[24px] mb-[20px]">
        Недавние
      </p>

      <div className="flex items-center gap-[6px] mb-[20px]">
        {infoData.map((item, index) => (
          <InfoItem
            statusClassName="!text-[#969696] !text-[14px]"
            className="!min-w-[230px]"
            key={index}
            {...item}
          />
        ))}
      </div>

      <SearchInput
        className="mb-[30px]"
        style="gray"
        value={valueSearch}
        onChange={setValueSearch}
        placeholder="Введите название"
      />

      <div className="w-full flex flex-col gap-[8px] mt-[30px]">
        <div
          className="grid  items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
          style={{
            gridTemplateColumns: "52px 1fr 1fr 1fr 0.7fr 1fr 1fr 0.5fr",
          }}
        >
          {columns.map((col, index) => (
            <div
              key={String(col.key) + index}
              className=" px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-gray border-r border-borderGray last:border-0 h-full flex items-center"
            >
              {col.title || ""}
            </div>
          ))}
        </div>
        {dataTable.map((row, index) => {
          const { statusText, statusColor } = dataMap[row.status];
          return (
            <div
              key={index}
              className="grid  items-center border-b border-borderGray h-[64px]"
              style={{
                gridTemplateColumns: "52px 1fr 1fr 1fr 0.7fr 1fr 1fr 0.5fr",
              }}
            >
              <div className="px-[16px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F] text-center ">
                {index + 1}
              </div>

              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.name}
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.id}
              </div>
              <div className=" px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {row.city}
              </div>
              <div className=" px-[16px]">
                <StatusItem text={statusText} status={statusColor} />
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F">
                {row.activeTasks}
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.deadline}
              </div>
              <div className="px-[16px] flex justify-end">
                <Button
                  text="Открыть"
                  onClick={() => navigate(`/tasks/${row.name}`)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
