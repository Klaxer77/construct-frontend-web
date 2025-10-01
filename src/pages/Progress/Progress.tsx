import { useState } from "react";
import { Header, ProjectItem, TabsControl } from "../../widgets";
import { tabs } from "./data";
import {
  useCompanyStatus,
  useCurrentCompany,
} from "../../shared/hooks/useCompany";

export const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data: companyData } = useCurrentCompany();
  const { data: statusData } = useCompanyStatus(companyData?.id ?? "");

  return (
    <div className="">
      <Header title="Ход работ" subtitle="Анализ временных значений проектов" />

      <div className="mb-[30px]">
        <TabsControl tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="flex flex-col gap-[15px]">
        {statusData?.map((item, index) => (
          <ProjectItem
            key={index}
            title={item.title}
            status={item.status as "lead" | "plan" | "delay" | "known"}
            id={item.id}
            adress={item.city}
            procentage={43}
            responsible={item.responsible_user?.fio ?? "Неизвестно"}
            employees={23}
            updated={item.updated_at}
            coords={item.coords}
          />
        ))}
      </div>
    </div>
  );
};
