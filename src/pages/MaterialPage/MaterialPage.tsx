import { useLocation, useNavigate } from "react-router";
import { Button, Icon } from "../../shared";
import { useMaterialsDetails } from "../../shared/hooks/useMaterials";
import { ChatAvatars, Header } from "../../widgets";
import avatar from "/img/avatar.jpg";
import { useObjectById } from "../../shared/hooks/useObjects";
import { useState } from "react";

export const MaterialPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const object_id = searchParams.get("object_id") ?? "";
  const material_id = searchParams.get("material_id") ?? "";
  const material_title = searchParams.get("material_title") ?? "";
  const subtitle = searchParams.get("subtitle") ?? "";
  const { data: materials } = useMaterialsDetails(material_id);
  const { data: object } = useObjectById(object_id);
  const avatars = [avatar, avatar, avatar, avatar, avatar];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState<"first" | "second">("first");
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(date)
      .replace("г.", "г.")
      .replace(",", " |");
  };
  return (
    <div>
      <div className="flex gap-[10px]">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <Icon name="TickLeft" />
        </button>
        <div className="flex items-center justify-between w-full">
          <Header title={object?.title} subtitle={`ID: ${object?.using_id}`} />
          <div className="flex items-center gap-[20px]">
            <ChatAvatars avatars={avatars} />
            <Button text="Перейти в чат" onClick={() => {}} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="font-[700] text-[20px] leading-[30px] tracking-[-0.4px] text-[#1C1C1C]">
          Состав работ
        </h2>
        <p className="text-[#3D3D3D] font-[700] text-[16px] leading-[16px] tracking-[-0.4px] mt-[30px]">
          {material_title}
        </p>
        <p className="text-[#585757] font-[600] text-[14px] leading-[20px] tracking-[-0.2px] mt-[12px]">
          {subtitle}
        </p>
        <div className="flex gap-[10px] mt-[11px]">
          <Button
            text="Внесенные"
            className="h-[43px] rounded-[15px] text-[15px]"
            style={active === "first" ? "blue" : "white"}
            onClick={() => setActive("first")}
          />
          <Button
            text="Требуется"
            className="h-[43px] rounded-[15px] text-[15px] !font-[600]"
            style={active === "second" ? "blue" : "white"}
            onClick={() => setActive("second")}
          />
        </div>
        <div className="flex flex-col gap-[28px] mt-[30px]">
          {materials?.map((item, index) => (
            <div
              className={`flex flex-col gap-[22px]  overflow-hidden ${
                openIndex === index ? "h-max" : "h-[111px]"
              }`}
              key={index}
            >
              <div
                className="flex items-center justify-between pb-[12px] border-b border-borderGray cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="flex flex-col gap-[12px]">
                  <p className="font-[700] text-[16px] leading-[16px] tracking-[-0.4px] text-[#3D3D3D]">
                    {item.item_name}
                  </p>
                  <p className="font-[600] text-[14px] leading-[12px] tracking-[-0.28px] text-[#00000080]">
                    {item.size}
                  </p>
                  <p className="font-[600] text-[14px] leading-[12px] tracking-[-0.28px] text-[#00000080]">
                    {item.quantity}
                  </p>
                  <p className="font-[600] text-[14px] leading-[22px] tracking-[-0.2px] text-[#A0A0A5]">
                    {formatDateTime(item.created_at)}
                  </p>
                </div>
                <Icon
                  name="TickBottom"
                  color="#007AFF"
                  className={`transition ${
                    openIndex === index && "rotate-180"
                  }`}
                />
              </div>
              <div className="pb-[17px] border-b border-borderGray flex flex-col gap-[10px]">
                <h2 className="font-[800] text-[16px] leading-[24px] tracking-[-0.1px] text-[#007AFF]">
                  Транспортная накладная {item.request_number}
                </h2>

                <div className="flex flex-col gap-[8px]">
                  <p className="font-[600] text-[14px] text-[#A0A0A5]">
                    Грузоотправитель
                  </p>
                  <p className="font-[700] text-[16px] text-[#3D3D3D]">
                    {item.sender}
                  </p>
                </div>

                <div className="flex justify-between">
                  {[
                    { label: "Дата", value: item.date },
                    { label: "Заявка", value: item.request_number },
                    { label: "Тип", value: item.item_name },
                    { label: "Название", value: item.item_name },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col gap-[8px] w-full">
                      <p className="font-[600] text-[14px] text-[#A0A0A5]">
                        {f.label}
                      </p>
                      <p className="font-[700] text-[16px] text-[#3D3D3D]">
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  {[
                    { label: "Размер", value: item.size },
                    { label: "Кол-во", value: item.quantity },
                    { label: "Нетто", value: item.net_weight },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col gap-[8px] w-full">
                      <p className="font-[600] text-[14px] text-[#A0A0A5]">
                        {f.label}
                      </p>
                      <p className="font-[700] text-[16px] text-[#3D3D3D]">
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  {[
                    { label: "Брутто", value: item.gross_weight },
                    { label: "Объем", value: item.volume },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col gap-[8px] w-full">
                      <p className="font-[600] text-[14px] text-[#A0A0A5]">
                        {f.label}
                      </p>
                      <p className="font-[700] text-[16px] text-[#3D3D3D]">
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>

                {[
                  { label: "Перевозчик", value: item.carrier },
                  { label: "Транспортное средство", value: item.vehicle },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col gap-[8px]">
                    <p className="font-[600] text-[14px] text-[#A0A0A5]">
                      {f.label}
                    </p>
                    <p className="font-[700] text-[16px] text-[#3D3D3D]">
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
