import { Button, InfoItem } from "../../shared";
import {
  ChatAvatars,
  EmployeesTable,
  Header,
  MagazinesTable,
  ProgressTab,
  TabsControl,
  TasksTable,
} from "../../widgets";
import avatar from "/img/avatar.jpg";
import { infoData, statusMap, tabs } from "./data";
import { useEffect, useState } from "react";
import { RemarksBlock } from "./RemarksBlock";
import { GeneralBlock } from "./GeneralBlock";
import { useObjectById } from "../../shared/hooks/useObjects";
import { useLocation, useNavigate } from "react-router";
import { ViolationsBlock } from "./ViolationsBlock";
import { MaterialsBlock } from "./MaterialsBlock";
import { Loader } from "../../shared/ui/Loader/Loader";

export const ObjectPage = () => {
  const avatars = [avatar, avatar, avatar, avatar, avatar];
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") ?? "";
  const tabFromUrl = searchParams.get("tab");
  const { data: object, isFetching } = useObjectById(id);
  const [activeTab, setActiveTab] = useState(tabFromUrl || "general");

  const currentStatus = statusMap[object?.status as keyof typeof statusMap];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("tab", tab);

    navigate(
      {
        pathname: location.pathname,
        search: newSearchParams.toString(),
      },
      { replace: true }
    );
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location.search]);

  return isFetching ? (
    <div className="h-dvh flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div>
      <Header title={object?.title} subtitle={`ID: ${object?.using_id}`}>
        <div className="flex items-center gap-[20px]">
          <ChatAvatars avatars={avatars} />
          <Button
            text="Перейти в чат"
            onClick={() => {}}
            className="h-[45px] text-[16px]"
          />
        </div>
      </Header>
      {activeTab === "general" && currentStatus && (
        <div className="flex items-center gap-[6px] mb-[30px]">
          <InfoItem
            title={currentStatus.title}
            subtitle="Статус"
            text={currentStatus.text}
            status={currentStatus.status as "stable" | "fast"}
          />
          {infoData.map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </div>
      )}

      <TabsControl tabs={tabs} active={activeTab} onChange={handleTabChange} />

      <div className="mt-[30px]">
        {activeTab === "progress" ? (
          <ProgressTab data={object} />
        ) : activeTab === "tasks" ? (
          <TasksTable />
        ) : activeTab === "employees" ? (
          <EmployeesTable />
        ) : activeTab === "magazine" ? (
          <MagazinesTable />
        ) : activeTab === "remarks" ? (
          <RemarksBlock data={object} />
        ) : activeTab === "violations" ? (
          <ViolationsBlock data={object} />
        ) : activeTab === "materials" ? (
          <MaterialsBlock object_id={object?.id} object_title={object?.title} />
        ) : (
          <GeneralBlock data={object} />
        )}
      </div>
    </div>
  );
};
