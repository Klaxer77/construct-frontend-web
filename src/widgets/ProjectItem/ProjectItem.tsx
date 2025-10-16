import { useState } from "react";
import {
  Button,
  Icon,
  ProgressBar,
  StatusItem,
  Table,
  usePluralize,
} from "../../shared";
import { useNavigate } from "react-router";
import { columns, data } from "./data";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { formatFio } from "../../shared/hooks/useFormatFIO";
import { Map, Polygon, ZoomControl } from "@pbe/react-yandex-maps";

interface ProjectItemProps {
  title: string;
  status: "lead" | "plan" | "delay" | "known" | "act";
  adress: string;
  procentage: number;
  responsible: string;
  employees: number;
  updated: string;
  id: string;
  coords: number[][][] | number[][];
}

export const ProjectItem = ({
  title,
  status,
  adress,
  procentage,
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
                {procentage}%
              </p>
            </div>
            <ProgressBar value={procentage} style={statusColor} />
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
          data={data}
          gridTemplateColumns="52px 2fr 1fr 1fr 1fr 0.5fr"
        />
        ;
      </div>
    </div>
  );
};
