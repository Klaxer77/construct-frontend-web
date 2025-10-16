import { useState } from "react";
import { Button, Icon, StatusItem } from "../../shared";
import { Header, TabsControl } from "../../widgets";
import { tabs } from "./data";
import { useNavigate } from "react-router";
import { FileModal } from "../../entities";
import { ContractorModal } from "../../widgets/ContractorModal/ContractorModal";
import { useChangeObjectAct, useObjects } from "../../shared/hooks/useObjects";
import { useCurrentCompany } from "../../shared/hooks/useCompany";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { useCurrentUser } from "../../shared/hooks/useAuth";
import { formatFio } from "../../shared/hooks/useFormatFIO";
import { Loader } from "../../shared/ui/Loader/Loader";

export const Objects = () => {
  const [fileModal, setFileModal] = useState(false);
  const [contractorModal, setContractorModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState("");
  const [selectedObjectId, setSelectedObjectId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeButton, setActiveButton] = useState<
    "active" | "not_active" | "agreement" | "act_opening" | "geo"
  >("active");
  const { formatDate } = useFormatDate();
  const { data: company } = useCurrentCompany();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const isContractor = user?.role === "contractor";
  const isInspection = user?.role === "inspection";
  const isConstructionControl = user?.role === "construction_control";

  const buttons = isContractor
    ? [
        { id: "active", text: "Активные" },
        { id: "not_active", text: "Неактивные" },
      ]
    : isInspection
    ? [
        { id: "active", text: "Активные" },
        { id: "not_active", text: "Неактивные" },
        { id: "agreement", text: "На согласовании" },
        { id: "geo", text: "Требуются геометки" },
      ]
    : [
        { id: "active", text: "Активные" },
        { id: "not_active", text: "Неактивные" },
        { id: "act_opening", text: "Требуется акт открытия" },
        { id: "agreement", text: "На согласовании" },
        { id: "geo", text: "Требуются геометки" },
      ];
  const shouldFetchActOpening =
    (isInspection || isContractor) && activeButton === "not_active";

  const { data: allObjects, isFetching } = useObjects("all", company?.id ?? "");

  const objects = allObjects?.filter((obj) => {
    switch (activeButton) {
      case "active":
        return obj.object_type === "active";
      case "not_active":
        return shouldFetchActOpening
          ? ["not_active", "act_opening"].includes(obj.object_type)
          : obj.object_type === "not_active";
      case "act_opening":
        return obj.object_type === "act_opening";
      case "agreement":
        return obj.object_type === "agreement";
      case "geo":
        return obj.object_type === "active" && obj.is_nfc === false;
      default:
        return false;
    }
  });

  const dataMap = {
    lead: { statusText: "Опережение", statusColor: "blue" },
    plan: { statusText: "По плану", statusColor: "green" },
    delay: { statusText: "Опоздание", statusColor: "red" },
    known: {
      statusText: isConstructionControl
        ? "Требуется Чек - Лист"
        : "Ожидается заполнение чек - листа",
      statusColor: "blue",
    },
    act: {
      statusText: isConstructionControl
        ? "Требуется акт"
        : "Ожидается отправка акта открытия",
      statusColor: isConstructionControl ? "yellow" : "blue",
    },
  } as const;

  const hideLastColumn =
    (activeButton === "not_active" || activeButton === "act_opening") &&
    user?.role !== "construction_control";

  const { mutate: agree } = useChangeObjectAct();

  const handleAgree = (action: "accept" | "deny", objectId: string) => {
    agree({ objectId, action });
  };

  return (
    <>
      <Header
        title={`Объекты: ${objects?.length ?? ""}`}
        subtitle="Управление и просмотр доступных проектов"
      >
        {isConstructionControl && (
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

      {isFetching ? (
        <div className="flex items-center justify-center h-[60dvh]">
          <Loader />
        </div>
      ) : objects?.length !== 0 ? (
        <div className="w-full flex flex-col gap-[8px] mt-[30px]">
          <div
            className="grid  items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
            style={{
              gridTemplateColumns: hideLastColumn
                ? "52px 1fr 1fr 1fr 1.5fr 1fr 1fr"
                : isInspection && activeButton === "agreement"
                ? "52px 1fr 1fr 1fr 1fr 1fr 0.5fr 1.5fr"
                : "52px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              №
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              Название
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              ID Объекта
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              Город
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              Статус
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              Ответственный
            </div>
            <div className="px-[16px] font-[700] text-[16px] text-gray border-r border-borderGray flex items-center h-full">
              {isInspection && activeButton === "agreement"
                ? "Файл"
                : "Дата проверки"}
            </div>
            {!hideLastColumn && (
              <div className="px-[16px] font-[700] text-[16px] text-gray flex items-center justify-end"></div>
            )}
          </div>
          {objects?.map((row, index) => {
            const shortFio = formatFio(row.responsible_user?.fio);
            return (
              <div
                key={index}
                className="grid  items-center border-b border-borderGray min-h-[64px]"
                style={{
                  gridTemplateColumns: hideLastColumn
                    ? "52px 1fr 1fr 1fr 1.5fr 1fr 1fr"
                    : isInspection && activeButton === "agreement"
                    ? "52px 1fr 1fr 1fr 1fr 1fr 0.5fr 1.5fr"
                    : "52px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="px-[16px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F] text-center ">
                  {index + 1}
                </div>

                <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] truncate">
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
                    text={(() => {
                      if (
                        row.object_type === "not_active" &&
                        row.check_list?.status === "rejected" &&
                        isConstructionControl
                      ) {
                        return "Чек-лист отклонен";
                      }
                      if (
                        row.object_type === "act_opening" &&
                        row.act?.status === "rejected" &&
                        isConstructionControl
                      ) {
                        return "Акт отклонен";
                      }
                      if (row.object_type === "agreement") {
                        return row.check_list?.status === "awaiting"
                          ? "Чек - Лист"
                          : "Акт открытия";
                      }
                      if (activeButton === "geo") {
                        return "Ожидание";
                      }
                      return (
                        dataMap[row.status as keyof typeof dataMap]
                          ?.statusText ?? ""
                      );
                    })()}
                    status={(() => {
                      if (
                        row.object_type === "not_active" &&
                        row.check_list?.status === "rejected" &&
                        isConstructionControl
                      ) {
                        return "darkRed";
                      }
                      if (
                        row.object_type === "act_opening" &&
                        row.act?.status === "rejected" &&
                        isConstructionControl
                      ) {
                        return "darkRed";
                      }
                      if (row.object_type === "agreement") {
                        return isInspection ? "yellow" : "blue";
                      }
                      if (activeButton === "geo") {
                        return "blue";
                      }
                      return (
                        dataMap[row.status as keyof typeof dataMap]
                          ?.statusColor ?? "blue"
                      );
                    })()}
                  />
                </div>
                <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F">
                  {shortFio ?? "Неизвестно"}
                </div>
                {isInspection && activeButton === "agreement" ? (
                  <div className="flex items-center justify-center">
                    {row.act?.file_url && (
                      <button
                        className="cursor-pointer w-max"
                        onClick={() => window.open(row.act.file_url, "_blank")}
                      >
                        <Icon name="Download" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                    {formatDate(row.date_delivery_verification)}
                  </div>
                )}
                {!hideLastColumn && (
                  <div className="px-[16px] flex justify-end">
                    {activeButton === "geo" ? (
                      <span className="text-[14px] font-[700] text-blueSideBarActive text-right">
                        Доступно через мобильное приложение
                      </span>
                    ) : row.object_type === "not_active" &&
                      isConstructionControl ? (
                      <Button
                        text="Заполнить"
                        onClick={() => {
                          setSelectedObject(row.title);
                          setSelectedObjectId(row.id);
                          setContractorModal(true);
                        }}
                      />
                    ) : row.object_type === "act_opening" ? (
                      isConstructionControl ? (
                        <Button
                          text={
                            row.status === "act"
                              ? "Прикрепить"
                              : "Подать заново"
                          }
                          onClick={() => {
                            setSelectedObjectId(row.id);
                            setFileModal(true);
                          }}
                        />
                      ) : null
                    ) : row.object_type === "agreement" ? (
                      isConstructionControl ? (
                        <span className="text-[14px] font-[700] text-blueSideBarActive text-right">
                          Ожидается решение инспектора
                        </span>
                      ) : row.check_list.status === "awaiting" ? (
                        <Button
                          text="Открыть"
                          onClick={() => {
                            navigate(
                              `/objects/activation/${row.title}?object_id=${row.id}`
                            );
                          }}
                        />
                      ) : (
                        <div className="flex gap-[5px]">
                          <Button
                            text="Принять"
                            onClick={() => handleAgree("accept", row.id)}
                          />
                          <Button
                            text="Отклонить"
                            style="red"
                            onClick={() => handleAgree("deny", row.id)}
                          />
                        </div>
                      )
                    ) : (
                      <Button
                        text="Открыть"
                        onClick={() =>
                          navigate(`/objects/${row.title}?id=${row.id}`)
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="min-h-[60dvh] flex flex-col items-center justify-center gap-[10px]">
          <Icon name="LocationAdd" />
          {activeButton === "active" ? (
            <>
              <p className="font-[700] text-[24px] leading-[36px] tracking-[-0.4px] max-w-[300px] text-center">
                Отсутсвуют активные объекты
              </p>
              <p className="text-[#A0A0A5] text-[20px] font-[600] leading-[30px] tracking-[-0.4px] max-w-[400px] text-center">
                {user?.role !== "construction_control"
                  ? "Дождитесь создания объекта со стороны Заказчика"
                  : "Активируйте их или создайте новый!"}
              </p>
              {isConstructionControl && (
                <Button
                  text="Создать объект"
                  onClick={() => navigate("/objects/create")}
                  style="black"
                  className="h-[45px] text-[16px] !gap-0 !bg-[#333333]"
                />
              )}
            </>
          ) : (
            <>
              <p className="font-[700] text-[24px] leading-[36px] tracking-[-0.4px]">
                Раздел пуст
              </p>
              <p className="text-[#A0A0A5] text-[20px] font-[600] leading-[30px] tracking-[-0.4px] max-w-[400px] text-center">
                Нет объектов которые соответствуют данному статусу
              </p>
            </>
          )}
        </div>
      )}

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
    </>
  );
};
