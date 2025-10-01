import { useNavigate } from "react-router";
import { Button, InfoItem, useFormatNumber } from "../../shared";
import { Header } from "../../widgets";
import { dataTable, infoData } from "./data";

import staff from "/img/Staff.png";
import { useCurrentUser, useLogout } from "../../shared/hooks/useAuth";
import {
  useCompanyStatus,
  useCurrentCompany,
} from "../../shared/hooks/useCompany";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const formatNumber = useFormatNumber();
  const { data: user } = useCurrentUser();
  const { data: company } = useCurrentCompany();
  const { data: statusData } = useCompanyStatus(company?.id ?? "");

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess() {
        navigate("/login");
      },
    });
  };

  const roleMap = {
    construction_control: { text: "Строительный контроль" },
    contractor: { text: "Подрядная компания" },
    inspection: { text: "Инспекция" },
  } as const;

  const { text } = roleMap[user?.role as keyof typeof roleMap];

  return (
    <div>
      <Header title="Профиль" subtitle={`ID: ${user?.using_id}`} />

      <div className="flex justify-between items-center mb-[45px]">
        <div className="flex gap-[30px] items-center">
          <div className="overflow-hidden w-[200px] h-[200px] rounded-full border border-borderGray">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar ?? staff}
              alt="ава"
            />
          </div>
          <div>
            <div className="flex flex-col gap-[5px] mb-[30px]">
              <p className="font-[700] text-[28px] text-[#3E3E3E] leading-[34px]">
                {user?.fio}
              </p>
              <p className="font-[700] text-[#7B7B7B] leading-[24px]">
                Старший инспектор | Строительная компания “{company?.title}”
              </p>
              <p className="font-[600] text-gray leading-[26px]">{text}</p>
              <p className="font-[600] text-gray leading-[26px]">
                {user?.email}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <Button
                text="Выйти"
                style="white"
                className="text-redError h-[45px] text-[16px]"
                onClick={handleLogout}
              />
              <Button
                className="!text-[16px] !h-[45px]"
                style="white"
                text="Настройки"
              />
              <Button
                className="!text-[16px] !h-[45px]"
                style="white"
                text="Цифровая подпись"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[6px] mb-[20px]">
          <InfoItem
            title={formatNumber(
              statusData?.filter(
                (item) => item.status !== "known" && item.status !== "act"
              ).length ?? 0
            )}
            statusClassName="!text-[#969696] !text-[14px]"
            className="!min-w-[230px]"
            subtitle="Активных проектов"
            status="stable"
            text="Статус: Стабильно"
            img
          />
          {infoData.map((item, index) => (
            <InfoItem
              img
              statusClassName="!text-[#969696] !text-[14px]"
              className="!min-w-[230px]"
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[20px] font-[700] leading-[100%] text-[#272525] mb-[30px]">
          Новые события
        </p>
        <div
          className="grid items-center mb-[15px]"
          style={{
            gridTemplateColumns: "100px 1fr 1fr 1fr 1fr",
          }}
        >
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            №
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Действие
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Проект
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Дата
          </p>
        </div>
        <div className="max-h-[385px] overflow-y-auto mb-[30px]">
          {dataTable.map((row, index) => {
            return (
              <div
                key={index}
                className="grid  items-center border-b border-borderGray h-[64px]"
                style={{
                  gridTemplateColumns: "100px 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {index + 1}
                </div>

                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.action}
                </div>
                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.project}
                </div>
                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.data}
                </div>
                <div className="px-[16px] flex justify-end">
                  <Button
                    text="Открыть"
                    onClick={() => navigate(`/profile/${row.action}`)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[20px] font-[700] leading-[100%] text-[#272525] mb-[30px]">
          История действий
        </p>
        <div
          className="grid items-center mb-[15px]"
          style={{
            gridTemplateColumns: "100px 1fr 1fr 1fr 1fr",
          }}
        >
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            №
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Действие
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Проект
          </p>
          <p className="text-gray70 text-[14px] font-[800] leading-[22px] px-[16px] pl-0">
            Дата
          </p>
        </div>
        <div className="max-h-[385px] overflow-y-auto mb-[30px]">
          {dataTable.map((row, index) => {
            return (
              <div
                key={index}
                className="grid  items-center border-b border-borderGray h-[64px]"
                style={{
                  gridTemplateColumns: "100px 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {index + 1}
                </div>

                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.action}
                </div>
                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.project}
                </div>
                <div className=" px-[16px] pl-0 font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#272525]">
                  {row.data}
                </div>
                <div className="px-[16px] flex justify-end">
                  <Button
                    text="Открыть"
                    onClick={() => navigate(`/profile/${row.action}`)}
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
