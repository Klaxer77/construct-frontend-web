import { useState } from "react";
import { Button, Icon, StatusItem } from "../../shared";
import { Header, TabsControl } from "../../widgets";
import { columns, tabs } from "./data";
import { useNavigate } from "react-router";
import { FileModal } from "../../entities";
import { ContractorModal } from "../../widgets/ContractorModal/ContractorModal";
import { useObjects } from "../../shared/hooks/useObjects";
import { useCurrentCompany } from "../../shared/hooks/useCompany";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { useCurrentUser } from "../../shared/hooks/useAuth";
import { formatFio } from "../../shared/hooks/useFormatFIO";

export const Objects = () => {
  const [fileModal, setFileModal] = useState(false);
  const [contractorModal, setContractorModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState("");
  const [selectedObjectId, setSelectedObjectId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeButton, setActiveButton] = useState<
    "active" | "not_active" | "agreement" | "act_opening"
  >("active");
  const { formatDate } = useFormatDate();
  const { data: company } = useCurrentCompany();
  const { data: objects } = useObjects(activeButton, company?.id ?? "");
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const buttons =
    user?.role === "contractor"
      ? [
          { id: "active", text: "Доступные" },
          { id: "not_active", text: "Завершенные" },
        ]
      : [
          { id: "active", text: "Активные" },
          { id: "not_active", text: "Неактивные" },
          { id: "agreement", text: "На согласовании" },
          { id: "act_opening", text: "Требуется акт открытия" },
        ];

  const dataMap = {
    lead: { statusText: "Опережение", statusColor: "blue" },
    plan: { statusText: "По плану", statusColor: "green" },
    delay: { statusText: "Опоздание", statusColor: "red" },
    known: { statusText: "Неизвестно", statusColor: "gray" },
    act: { statusText: "Требуется акт", statusColor: "yellow" },
  } as const;
  return (
    <div>
      <Header
        title={`Объекты: ${objects?.length ?? ''}`}
        subtitle="Управление и просмотр доступных проектов"
      >
        {user?.role === "construction_control" && (
          <Button
            text="Создать объект"
            onClick={() => navigate("/objects/create")}
            icon={<Icon name="TickRight" color="white" />}
            position="right"
            style="black"
            className="h-[45px] text-[16px] !gap-0"
          />
        )}
      </Header>

      <div className="flex items-center gap-[10px] mb-[30px]">
        {buttons.map((item) => (
          <Button
            key={item.id}
            text={item.text}
            onClick={() => setActiveButton(item.id as typeof activeButton)}
            style={activeButton === item.id ? "blue" : "white"}
            className="h-[45px] text-[16px]"
          />
        ))}
      </div>

      <TabsControl tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="w-full flex flex-col gap-[8px] mt-[30px]">
        <div
          className="grid  items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
          style={{
            gridTemplateColumns: "52px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
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
        {objects?.map((row, index) => {
          const { statusText, statusColor } =
            dataMap[row.status as keyof typeof dataMap];
            const shortFio = formatFio(row.responsible_user?.fio);
          return (
            <div
              key={index}
              className="grid  items-center border-b border-borderGray h-[64px]"
              style={{
                gridTemplateColumns: "52px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              }}
            >
              <div className="px-[16px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F] text-center ">
                {index + 1}
              </div>

              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.title}
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.using_id}
              </div>
              <div className=" px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                {row.city}
              </div>
              <div className=" px-[16px]">
                <StatusItem
                  text={
                    row.object_type === "agreement"
                      ? "Согласование"
                      : statusText
                  }
                  status={
                    row.object_type === "agreement" ? "blue" : statusColor
                  }
                />
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F">
                {shortFio ?? "Неизвестно"}
              </div>
              <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {formatDate(row.date_delivery_verification)}
              </div>
              <div className="px-[16px] flex justify-end">
                {row.object_type === "not_active" ? (
                  <Button
                    text="Активировать"
                    onClick={() => {
                      setSelectedObject(row.title);
                      setSelectedObjectId(row.id);
                      setContractorModal(true);
                    }}
                  />
                ) : row.object_type === "act_opening" ? (
                  user?.role === "construction_control" ? (
                    <Button
                      text="Прикрепить"
                      onClick={() => {
                        setSelectedObjectId(row.id);
                        setFileModal(true);
                      }}
                    />
                  ) : null
                ) : row.object_type === "agreement" ? (
                  <Button
                    text="Просмотреть"
                    onClick={() => {
                      navigate(
                        `/objects/activation/${row.title}?object_id=${row.id}`
                      );
                    }}
                  />
                ) : (
                  <Button
                    text="Открыть"
                    onClick={() =>
                      navigate(`/objects/${row.title}?id=${row.id}`)
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <FileModal
        open={fileModal}
        onClose={() => setFileModal(false)}
        objectId={selectedObjectId}
      />
      <ContractorModal
        name={selectedObject}
        objectId={selectedObjectId}
        open={contractorModal}
        onClose={() => setContractorModal(false)}
      />
    </div>
  );
};
