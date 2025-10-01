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
import { infoData, tabs } from "./data";
import { useState } from "react";
import { RemarksBlock } from "./RemarksBlock";
import { GeneralBlock } from "./GeneralBlock";
import { useObjectById } from "../../shared/hooks/useObjects";
import { useLocation } from "react-router";
import { ViolationsBlock } from "./ViolationsBlock";

export const ObjectPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const avatars = [avatar, avatar, avatar, avatar, avatar];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") ?? "";
  const { data: object } = useObjectById(id);

  const statusMap = {
    lead: {
      title: "Опережение",
      text: "Проект успевает по срокам",
      status: "stable",
    },
    plan: {
      title: "По плану",
      text: "Проект успевает по срокам",
      status: "stable",
    },
    delay: {
      title: "Опоздание",
      text: "Проект не успевает по срокам",
      status: "fast",
    },
  };

  const currentStatus = statusMap[object?.status as keyof typeof statusMap];

  return (
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

      <TabsControl tabs={tabs} active={activeTab} onChange={setActiveTab} />

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
        ) : (
          <GeneralBlock data={object} />
        )}
      </div>
    </div>
  );
};
