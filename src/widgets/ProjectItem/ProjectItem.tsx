import { useState } from "react";
import {
  Button,
  Icon,
  ProgressBar,
  StatusItem,
  usePluralize,
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

  const { data: percent } = useProgress(id);
  const procent = Math.round((percent?.progress ?? 0) * 100);
  const { data: work } = useMaterials(id);
  const { formatDate } = useFormatDate();

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
                {procent}%
              </p>
            </div>
            <ProgressBar value={procent} style={statusColor} />
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
        <div className="flex flex-col gap-[8px] w-full">
          <div
            className="grid items-center h-[52px] bg-[#F9F8F8] border border-borderGray rounded-t-[10px]"
            style={{ gridTemplateColumns: "52px 2fr 1fr 1fr 1fr 0.5fr" }}
          >
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              №
            </div>
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              Этап
            </div>
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              Дата начала
            </div>
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              Дата окончания
            </div>
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              Ответственный
            </div>
            <div className="px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center">
              Статус
            </div>
          </div>
          {work?.map((item, index) => {
            return (
              <div
                key={index}
                className="grid items-center border-b border-borderGray min-h-[64px]"
                style={{ gridTemplateColumns: "52px 2fr 1fr 1fr 1fr 0.5fr" }}
              >
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  {index + 1}
                </div>
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  {item.title}
                </div>
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  {formatDate(item.date_from)}
                </div>
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  {formatDate(item.date_to)}
                </div>
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  {formatFio(responsible)}
                </div>
                <div className="px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center">
                  <StatusItem
                    text={
                      item.percent === 0
                        ? "Не начат"
                        : item.percent === 1
                        ? "Этап сдан"
                        : "В работе"
                    }
                    status={
                      item.percent === 0
                        ? "gray"
                        : item.percent === 1
                        ? "green"
                        : "blue"
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
