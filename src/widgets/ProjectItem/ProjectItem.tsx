import { useState } from "react";
import {
  Button,
  Icon,
  ProgressBar,
  StatusItem,
  Table,
  usePluralize,
  type Column,
} from "../../shared";
import { useNavigate } from "react-router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { formatFio } from "../../shared/hooks/useFormatFIO";
import { Map, Polygon, ZoomControl } from "@pbe/react-yandex-maps";
import { useMaterials, useProgress } from "../../shared/hooks/useMaterials";
import { useFormatDate } from "../../shared/hooks/useFormatDate";

interface ProjectItemProps {
  title: string;
  status: "lead" | "plan" | "delay" | "known" | "act";
  adress: string;
  responsible: string;
  employees: number;
  updated: string;
  id: string;
  coords: number[][][] | number[][];
}

interface ObjectItem {
  number?: number;
  title: string;
  date_from: string;
  date_to: string;
  responsible: string;
  status_main: string;
}

export const ProjectItem = ({
  title,
  status,
  adress,
  responsible,
  employees,
  updated,
  id,
  coords,
}: ProjectItemProps) => {
  const pluralize = usePluralize();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const normalizeCoords = (
    coords?: number[][] | number[][][]
  ): number[][][] => {
    if (!coords) return [];
    if (Array.isArray(coords[0]) && typeof coords[0][0] === "number") {
      return [coords as number[][]];
    }
    return coords as number[][][];
  };

  const polygonCoords = normalizeCoords(coords);
  const center = [polygonCoords[0][0][1], polygonCoords[0][0][0]];

  const statusData = {
    lead: { statusText: "Опережение", statusColor: "blue" },
    plan: { statusText: "По плану", statusColor: "green" },
    delay: { statusText: "Опоздание", statusColor: "red" },
    known: { statusText: "Зпланировано", statusColor: "gray" },
    act: { statusText: "Согласование", statusColor: "blue" },
  } as const;
  const { statusText, statusColor } = statusData[status];

  const updatedText = updated
    ? formatDistanceToNow(parseISO(updated), { addSuffix: true, locale: ru })
    : "—";

  const { formatDate } = useFormatDate();

  const { data: percent } = useProgress(id);
  const { data: work } = useMaterials(id);
  const now = new Date();
  const columns: Column<ObjectItem>[] = [
    {
      key: "number",
      title: "№",
      render: (_value, _row, index) => index + 1,
    },
    { key: "title", title: "Этап" },
    {
      key: "date_from",
      title: "Дата начала",
      render: (value) => formatDate(String(value)),
    },
    {
      key: "date_to",
      title: "Дата окончания",
      render: (value) => formatDate(String(value)),
    },
    {
      key: "responsible",
      title: "Ответственный",
      render: () => (
        <div className="flex items-center gap-[14px]">
          {formatFio(responsible)}
          <Icon name="Share" color="#007AFF" />
        </div>
      ),
    },
    {
      key: "status_main",
      title: "Статус",
      render: (_value, row) => (
        <StatusItem
          text={
            String(now) <= row.date_to && String(now) >= row.date_from
              ? "В работе"
              : String(now) > row.date_to
              ? "Этап сдан"
              : "Не начат"
          }
          status={
            String(now) < row.date_to && String(now) > row.date_from
              ? "blue"
              : String(now) > row.date_to
              ? "green"
              : "gray"
          }
        />
      ),
    },
  ];

  return (
    <div className="p-[20px] border border-borderGray rounded-[20px] flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between gap-[20px]">
        <div className="flex flex-col gap-[25px] w-full">
          <div className="flex flex-col gap-[12px]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-[800] text-[18px] leading-[28px] tracking-[-0.4px] text-blackText">
                  {title}
                </h2>
                <p className="font-[600] text-[14px] leading-[22px] tracking-[-0.4px] text-[#73737C]">
                  {adress}
                </p>
              </div>

              <StatusItem text={statusText} status={statusColor} />
            </div>

            <div className="flex items-center justify-between">
              <p className="font-[700] text-[14px] leading-[22px] tracking-[-0.4px] text-[#272525]">
                Прогресс
              </p>
              <p className="font-[700] text-[14px] leading-[22px] tracking-[-0.4px] text-[#272525]">
                {Math.round(percent?.progress ?? 0)}%
              </p>
            </div>
            <ProgressBar
              value={Math.round(percent?.progress ?? 0)}
              style={statusColor}
            />
            <div className="flex items-center justify-between">
              <p className="font-[600] text-[14px] leading-[22px]  text-[#73737C]">
                Ответственный: {formatFio(responsible)}
              </p>
              <p className="font-[600] text-[14px] leading-[22px]  text-[#73737C]">
                {employees}{" "}
                {pluralize(employees, [
                  "сотрудник",
                  "сотрудника",
                  "сотрудников",
                ])}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-[700] text-[14px] leading-[24px] text-[#8E8E9A] order-2">
              Обновлено: {updatedText}
            </p>

            <div className="flex items-center gap-[12px]">
              <Button
                text={open ? "Свернуть" : "Развернуть"}
                onClick={() => setOpen(!open)}
                style={open ? "blue" : "white"}
                icon={
                  <Icon
                    name="TickTop"
                    className={`${!open && "rotate-180"} transition`}
                    color={open ? "white" : "#007AFF"}
                  />
                }
                position="right"
              />
              <Button
                text="Обновить"
                onClick={() => {}}
                style="white"
                icon={<Icon name="Pen" color="#007AFF" />}
              />
              <Button
                text="Открыть"
                onClick={() => navigate(`/objects/${title}?id=${id}`)}
                style="white"
                icon={<Icon name="Eye" color="#007AFF" />}
              />
            </div>
          </div>
        </div>
        <div className="rounded-[15px] min-h-[205px] w-[327px] overflow-hidden">
          <Map
            defaultState={{ center: center, zoom: 10 }}
            options={{
              suppressMapOpenBlock: true,
              copyrightUaVisible: false,
              copyrightLogoVisible: false,
              copyrightProvidersVisible: false,
            }}
            height={"205px"}
            width={"100%"}
          >
            <ZoomControl
              options={{ size: "small", position: { bottom: 10, left: 10 } }}
            />
            {polygonCoords.map((polygon, i) => (
              <Polygon
                key={i}
                geometry={[polygon.map(([lng, lat]) => [lat, lng])]}
                options={{ fillColor: "#007aff55", strokeColor: "#007aff" }}
              />
            ))}
          </Map>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "h-fit mt-[20px]" : "h-0 mt-0"
        }`}
      >
        <Table
          columns={columns}
          data={work as unknown as ObjectItem[]}
          gridTemplateColumns="52px 2fr 1fr 1fr 1fr 0.5fr"
        />
      </div>
    </div>
  );
};
