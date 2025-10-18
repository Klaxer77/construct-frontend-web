import { InfoItem, useFormatNumber } from "../../shared";
import {
  useCompanyStatus,
  useCurrentCompany,
} from "../../shared/hooks/useCompany";
import { Loader } from "../../shared/ui/Loader/Loader";
import {
  AttentionTable,
  Header,
  ProjectItem,
  RecentActions,
} from "../../widgets";
import { actionsData, attentionData, infoItems } from "./data";

export const Dashboard = () => {
  const formatNumber = useFormatNumber();
  const { data: companyData } = useCurrentCompany();
  const { data: statusData, isFetching } = useCompanyStatus(
    companyData?.id ?? ""
  );

  return isFetching ? (
    <div className="flex items-center justify-center h-dvh">
      <Loader />
    </div>
  ) : (
    <div>
      <Header
        title="Дашборд"
        subtitle={`Строительная компания “${companyData?.title}”`}
      ></Header>
      <div className="flex items-center gap-[19px] overflow-x-auto">
        <InfoItem
          title={formatNumber(
            statusData?.filter(
              (item) => item.status !== "known" && item.status !== "act"
            ).length ?? 0
          )}
          subtitle="Активных проектов"
          status="stable"
          text="Статус: Стабильно"
          img
        />
        {infoItems.map((item, index) => (
          <InfoItem
            key={index}
            {...item}
            title={formatNumber(item.title)}
            img
          />
        ))}
      </div>
      <div className="my-[19px] flex justify-between gap-[19px] w-full">
        <AttentionTable data={attentionData} />
        <RecentActions data={actionsData} />
      </div>
      <div className="py-[24px] px-[20px] border border-borderGray rounded-[20px] shadow-[0px_0px_9.7px_0px_#00000003] flex flex-col gap-[14px]">
        <h2 className="font-[700] text-[20px] tracking-[-0.2px] text-blackText">
          Статус проектов
        </h2>
        <div className="flex flex-col-reverse gap-[14px]">
          {statusData
            ?.filter((item) => ["lead", "plan", "delay"].includes(item.status))
            .map((item, index) => {
              return (
                <ProjectItem
                  key={index}
                  title={item.title}
                  status={item.status as "lead" | "plan" | "delay"}
                  adress={item.city}
                  id={item.id}
                  responsible={item.responsible_user?.fio ?? "Неизвестно"}
                  employees={23}
                  updated={item.updated_at}
                  coords={item.coords}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
