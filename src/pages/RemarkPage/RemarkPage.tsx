import { useLocation, useNavigate } from "react-router";
import { Button, Icon, StatusItem, Table, type Column } from "../../shared";
import avatar from "/img/avatar.jpg";
import { ChatAvatars, Header, ImageModal } from "../../widgets";
import { type ObjectItem } from "./data";
import { useState } from "react";
import {
  useChangeRemarkStatus,
  useRemarkById,
} from "../../shared/hooks/useRemarks";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { format, parseISO } from "date-fns";
import { useCurrentUser } from "../../shared/hooks/useAuth";

const dataMap = {
  not_fixed: { statusText: "Активен", statusColor: "green" },
  fixed: { statusText: "Исправлено", statusColor: "greenDark" },
  review: { statusText: "На проверке", statusColor: "blue" },
} as const;

export const RemarkPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") ?? "";
  const { data: remark } = useRemarkById(id);
  const { mutate: agree } = useChangeRemarkStatus();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const { formatDate } = useFormatDate();

  const { statusText, statusColor } = dataMap[remark?.status ?? "not_fixed"];

  const avatars = [avatar, avatar, avatar, avatar, avatar];

  const handleImageClick = (src: string) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const handleAgree = (action: "accept" | "deny") => {
    agree(
      { remarkId: remark?.id ?? "", action },
      { onSuccess: () => navigate("/objects") }
    );
  };

  const time = remark?.date_remark
    ? format(parseISO(remark?.date_remark), "HH:mm")
    : "";

  const columns: Column<ObjectItem>[] = [
    {
      key: "number",
      title: "№",
      render: (_value, _row, index) => (
        <p className="font-[800] text-[#413F3F] leading-[24px]">{index + 1}</p>
      ),
    },
    { key: "violations", title: "Перечень выявленных нарушений" },
    {
      key: "name_regulatory_docx",
      title: "Наименование нормативного документа, требования проекта (РД)",
    },
    {
      key: "photos",
      title: "Фотоматериал",
      render: (_value, _row, index) => {
        if (Array.isArray(_value) && _value.length > 0) {
          return (
            <div
              className="grid grid-cols-2 gap-[14px] items-center"
              key={index}
            >
              {_value.map((src, i) => (
                <div
                  key={i}
                  className="w-[64px] h-[64px] overflow-hidden rounded-[6px] relative flex justify-center items-center cursor-pointer"
                  onClick={() => handleImageClick(src)}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)]" />
                  <img
                    className="h-full w-full object-cover"
                    src={src}
                    alt=""
                  />
                  <Icon name="Plus" className="absolute z-20" />
                </div>
              ))}
            </div>
          );
        } else {
          return <p>Нет</p>;
        }
      },
    },
    {
      key: "expiration_date",
      title: "Срок устранения",
      render: (value) => <span>{formatDate(String(value))}</span>,
    },
    {
      key: "comment",
      title: "Комментарий",
      render: (_value) => <p className="">{_value ? _value : "Нет"}</p>,
    },
  ];

  const tableData: ObjectItem[] =
    remark?.remarks?.map((r, index) => ({
      number: index + 1,
      violations: r.violations,
      name_regulatory_docx: r.name_regulatory_docx,
      photos: r.photos?.map((p) => p.file_path) ?? [],
      expiration_date: r.expiration_date,
      comment: r.comment,
    })) ?? [];

  return (
    <>
      <div>
        <div className="flex gap-[10px] items-center w-full justify-between">
          <div className="flex gap-[10px] items-center">
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
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
              className="!pb-[10px]"
              classNameSubTitle="!text-[18px] !text-[#4C4C4C]"
              title={remark?.object_name}
              subtitle={`Замечание ${formatDate(remark?.date_remark)}`}
            ></Header>
          </div>

          <div className="flex items-center gap-[20px]">
            <StatusItem status={statusColor} text={statusText} />
            <ChatAvatars avatars={avatars} />
            <Button text="Перейти в чат" onClick={() => {}} />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-[10px] pl-[30px] mb-[30px]">
            <ul>
              <li className="font-[600] leading-[24px] text-[#9FA1A6]">
                Инспекционный контроль качества
              </li>
              <li className="font-[600] leading-[24px] text-[#9FA1A6]">
                Выполнения строительно-монтажных работ на объекте
              </li>
            </ul>

            <p className="font-[600] leading-[24px] text-[#9FA1A6]">
              Время: {time}
            </p>

            <p className="font-[600] leading-[24px] text-[#9FA1A6]">
              Местоположение: Нужны координаты
            </p>
          </div>
          {remark?.status === "review" &&
            user?.role === "construction_control" && (
              <div className="flex gap-[16px]">
                <Button text="Принять" onClick={() => handleAgree("accept")} />
                <Button
                  style="red"
                  text="Отказать"
                  onClick={() => handleAgree("deny")}
                />
              </div>
            )}
        </div>

        <Table
          classNameColItem="!p-[16px]"
          classNameRow="!h-full !py-[30px] !pl-[16px]"
          classNameColumn="!h-full"
          columns={columns}
          data={tableData}
          gridTemplateColumns="52px 1fr 1fr 170px 130px 200px"
        />
      </div>
      {isModalOpen && (
        <ImageModal
          imageSrc={modalImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
