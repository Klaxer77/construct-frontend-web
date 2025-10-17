import { useState } from "react";
import { Button, Icon, ProgressBar, StatusItem, Table } from "../../shared";
import {
  buttons,
  colorsExpl,
  columns,
  dataTable,
  lightStatusColors,
  months,
  statusColors,
  tasks,
} from "./data";
import { format, parseISO } from "date-fns";
import staff from "/img/Staff.png";
import { useCurrentUser } from "../../shared/hooks/useAuth";
import { CreateProgress } from "../CreateProgress/CreateProgress";

interface ResponsibleUser {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  email: string;
  fio: string;
  role: string;
}

interface dataTypes {
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

interface Data {
  data?: dataTypes;
}

const statusData = {
  lead: { text: "Опережение", color: "blue", barColor: "blue" },
  plan: { text: "По плану", color: "greenDark", barColor: "green" },
  delay: { text: "Опоздание", color: "red", barColor: "red" },
  known: { text: "Неизвестно", color: "gray", barColor: "gray" },
  act: { text: "Требуется акт", color: "yellow", barColor: "gray" },
} as const;

function formatMonth(ym: string): string {
  const date = new Date(2000, parseInt(ym) - 1);

  const shortMonth = date
    .toLocaleDateString("ru-RU", { month: "short" })
    .replace(".", "");
  return shortMonth.charAt(0).toUpperCase() + shortMonth.slice(1);
}

export const ProgressTab = ({ data }: Data) => {
  const { text, color, barColor } =
    statusData[data?.status as keyof typeof statusData];
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState<"general" | "change">(
    "general"
  );
  const [isCreating, setIsCreating] = useState(false);
  const { data: user } = useCurrentUser();
  const isConstructionControl = user?.role === "construction_control";

  const toggleOpen = (i: number) => {
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((index) => index !== i) : [...prev, i]
    );
  };
  return !isCreating ? (
    tasks ? (
      <div className="flex flex-col">
        <div className="flex justify-between mb-[20px]">
          <p className="text-[16px] font-[700] leading-[24px] text-blackText mb-[10px]">
            Расписание проекта | Диаграмма Ганта
          </p>
          <Button
            text="Экспорт"
            onClick={() => {}}
            icon={<Icon name="Diagram" />}
            position="right"
            style="white"
            className="h-[45px] text-[16px] !text-[#5D5D5D]"
          />
        </div>

        <StatusItem text={text} status={color} />

        <p className="font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-darkGray mt-[20px]">
          Срок сдачи:{" "}
          {format(
            parseISO(data?.date_delivery_verification ?? ""),
            "dd.MM.yyyy"
          )}
        </p>

        <div className="flex flex-col gap-[12px] mt-[16px]">
          <div className="flex justify-end gap-[5px]">
            {months.map((m) => (
              <p
                key={m}
                className="text-center h-[16px] w-[68px] font-[700] text-[12px] leading-[16px] tracking-[-0.2px] text-[#8E8E9A]"
              >
                {formatMonth(m)}
              </p>
            ))}
          </div>

          {tasks.map((task, i) => {
            const startMonth = task.start.split("-")[1];
            const startDay = parseInt(task.start.split("-")[2], 10);
            const endMonth = task.end.split("-")[1];
            const endDay = parseInt(task.end.split("-")[2], 10);

            return (
              <div key={i} className="flex justify-between items-center">
                <p className="font-[700] text-[14px] leading-[22px] tracking-[-0.2px] text-blackText">
                  {task.name}
                </p>
                <div className="flex items-center gap-[5px]">
                  {months.map((m) => {
                    let bg = "bg-[#E6E7EB]";

                    if (m > startMonth && m < endMonth) {
                      bg = statusColors[task.status];
                    } else if (m === startMonth) {
                      bg =
                        startDay > 15
                          ? lightStatusColors[task.status]
                          : statusColors[task.status];
                    } else if (m === endMonth) {
                      bg =
                        endDay < 15
                          ? lightStatusColors[task.status]
                          : statusColors[task.status];
                    }

                    return (
                      <div
                        key={m}
                        className={`h-[12px] w-[68px] rounded-[4px] ${bg}`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-[30px] mb-[20px]">
          <div className="flex items-center gap-[20px]">
            {colorsExpl.map((item, index) => (
              <div key={index} className="flex items-center gap-[8px]">
                <div
                  className={`w-[15px] h-[15px] rounded-[5px] ${item.color} `}
                ></div>
                <p className="font-[600] text-[12px] tracking-[-0.2px] text-blackText">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="font-[700] text-[14px] leading-[24px] text-darkGray">
            Этап: 4/6
          </p>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <p className="font-[700] text-[14px] leading-[22px] tracking-[-0.4px] text-blackText">
              Прогресс
            </p>
            <p className="font-[700] text-[14px] leading-[22px] tracking-[-0.4px] text-blackText">
              47%
            </p>
          </div>
          <ProgressBar value={47} style={barColor} />
        </div>

        <div className="flex flex-col gap-[20px] my-[24px]">
          <h2 className="font-[700] text-[16px] leading-[24px] text-blackText tracking-[-0.2px]">
            Ответственный
          </h2>
          {data?.responsible_user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[40px]">
                <div className="flex items-center gap-[14px]">
                  <img
                    src={data?.responsible_user.avatar ?? staff}
                    alt="аватар"
                    className="w-[32px] h-[32px] object-cover"
                  />
                  <div className={`flex flex-col`}>
                    <p className="text-darkGray font-[600] leading-[24px] text-[16px] whitespace-nowrap">
                      {data?.responsible_user.fio}
                    </p>
                    <p className="text-[#969696] font-[600] leading-[24px] text-[16px] whitespace-nowrap">
                      {data?.responsible_user.email}
                    </p>
                  </div>
                </div>{" "}
                <StatusItem
                  text={data?.responsible_user.is_active ? "Активен" : "Офлайн"}
                  status={data?.responsible_user.is_active ? "green" : "red"}
                />
              </div>

              <div className="flex items-center gap-[100px]">
                <p className="font-[600] text-[16px] leading-[24px] text-[#413F3F] tracking-[-0.2px]">
                  Назначен:{" "}
                  {format(parseISO(data?.created_at ?? ""), "dd.MM.yyyy")}
                </p>{" "}
                <Icon name="Dots" />
              </div>
            </div>
          ) : (
            <p className="font-[600] text-[16px] leading-[24px] text-[#413F3F] tracking-[-0.2px]">
              Неизвестно
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="font-[700] text-[16px] leading-[24px] text-blackText tracking-[-0.2px]">
            График и перечень работ
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              {buttons.map((item) => (
                <Button
                  key={item.id}
                  text={item.text}
                  onClick={() =>
                    setActiveButton(item.id as typeof activeButton)
                  }
                  style={activeButton === item.id ? "blue" : "white"}
                  className="h-[45px] text-[16px]"
                />
              ))}
            </div>
            <Button
              text="Добавить новый этап"
              className="h-[38px] !bg-[#F6F6F6] !text-blueSideBarActive"
              onClick={() => setIsCreating(true)}
            />
          </div>

          {tasks.map((t, i) => {
            const isOpen = openIndexes.includes(i);
            const progressColor =
              t.done === 100
                ? "text-[#00691E]"
                : t.done === 0
                ? "text-[#808080]"
                : "text-blueSideBarActive";
            return (
              <div
                key={i}
                className="py-[16px] border-b border-borderGray flex flex-col transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[20px]">
                    <p
                      className={`font-[700] text-[16px] leading-[14px] tracking-[-0.2px] ${progressColor}`}
                    >
                      {t.done}%
                    </p>
                    <div className="flex flex-col gap-[12px]">
                      <p className="font-[700] text-[16px] leading-[16px] text-[#3D3D3D] tracking-[-0.4px]">
                        {t.name}
                      </p>
                      <p className="font-[600] text-[14px] leading-[12px] text-[#00000080] tracking-[-0.28px]">
                        {`${new Date(t.start).toLocaleDateString(
                          "ru-RU"
                        )} – ${new Date(t.end).toLocaleDateString("ru-RU")}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-[20px]">
                    {isOpen && (
                      <Button
                        text="Изменить"
                        style="white"
                        icon={<Icon name="Pen" color="#007AFF" />}
                        position="right"
                      />
                    )}
                    <Button
                      text={isOpen ? "Свернуть" : "Развернуть"}
                      icon={
                        <Icon
                          name="TickBottom"
                          color="#007AFF"
                          className={`transition duration-300 ${
                            isOpen && "rotate-180"
                          }`}
                        />
                      }
                      position="right"
                      style="white"
                      onClick={() => toggleOpen(i)}
                    />
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "h-fit mt-[20px]" : "h-0 mt-0"
                  }`}
                >
                  <Table
                    columns={columns}
                    data={dataTable}
                    gridTemplateColumns="52px 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center gap-[10px]">
        <Icon name="LocationAdd" />
        <p className="font-[700] text-[24px] leading-[36px] tracking-[-0.4px] max-w-[300px] text-center">
          Ход работ не создан
        </p>
        <p className="text-[#A0A0A5] text-[20px] font-[600] leading-[30px] tracking-[-0.4px] max-w-[400px] text-center">
          {user?.role !== "construction_control"
            ? "Дождитесь создания хода работ"
            : "Создайте категории и этапы, для управления и модерирования работ"}
        </p>
        {isConstructionControl && (
          <Button
            text="Создать"
            onClick={() => setIsCreating(true)}
            className="h-[58px] rounded-[15px] px-[26px] text-[20px]"
          />
        )}
      </div>
    )
  ) : (
    <CreateProgress
      onCancel={() => setIsCreating(false)}
      onComplete={(data) => {
        console.log("Создан ход работ:", data);
        setIsCreating(false);
      }}
    />
  );
};
