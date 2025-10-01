import { useNavigate, useParams } from "react-router";
import { Header, TabsControl, TasksTable } from "../../widgets";
import { useState } from "react";
import { InfoItem, SearchInput } from "../../shared";
import { infoData } from "./data";

const TABS = [
  {
    label: "Все",
    value: "all",
  },
  {
    label: "Спринты",
    value: "sprint",
  },
  {
    label: "Контрольные точки",
    value: "сheckpoints",
  },
];

export const TaskPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [valueSearch, setValueSearch] = useState("");
  const navigation = useNavigate();
  const { name } = useParams();

  return (
    <div>
      <div className="flex justify-between gap-[190px]">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex gap-[10px] items-center">
            <button className="cursor-pointer" onClick={() => navigation(-1)}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M7.80927 13.2332L11.0426 9.99983L7.80927 6.7665C7.73212 6.68934 7.67092 6.59775 7.62916 6.49695C7.58741 6.39614 7.56592 6.2881 7.56592 6.179C7.56592 6.06989 7.58741 5.96185 7.62916 5.86104C7.67092 5.76024 7.73212 5.66865 7.80927 5.5915C7.88642 5.51434 7.97801 5.45314 8.07882 5.41139C8.17962 5.36964 8.28766 5.34814 8.39677 5.34814C8.50588 5.34814 8.61392 5.36964 8.71472 5.41139C8.81552 5.45314 8.90712 5.51434 8.98427 5.5915L12.8093 9.4165C13.1343 9.7415 13.1343 10.2665 12.8093 10.5915L8.98427 14.4165C8.90717 14.4937 8.8156 14.555 8.71479 14.5969C8.61398 14.6387 8.50591 14.6602 8.39677 14.6602C8.28763 14.6602 8.17956 14.6387 8.07875 14.5969C7.97794 14.555 7.88636 14.4937 7.80927 14.4165C7.4926 14.0915 7.48427 13.5582 7.80927 13.2332Z"
                  fill="#686868"
                />
              </svg>
            </button>
            <Header
              title={name}
              subtitle="Отслеживание задач для ваших объектов"
            ></Header>
          </div>

          <TabsControl active={activeTab} onChange={setActiveTab} tabs={TABS} />
        </div>
        <div className="flex items-center gap-[6px] mt-[50px]">
          {infoData.map((item, index) => (
            <InfoItem className="!min-w-[230px]" key={index} {...item} />
          ))}
        </div>
      </div>

      <SearchInput
        className="mb-[25px]"
        value={valueSearch}
        onChange={setValueSearch}
        style="gray"
        placeholder="Введите название"
      />

      {activeTab === "all" && <TasksTable subMenu={false} />}
    </div>
  );
};
