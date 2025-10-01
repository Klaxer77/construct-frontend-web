import { StatusItem, Table, type Column } from "../../shared";
import { data, type ObjectItem } from "./data";
import avatar from "/img/avatar.jpg";

const columns: Column<ObjectItem>[] = [
  {
    key: "name",
    title: "Сотрудник",
    render: (_, row) => (
      <div className="flex items-center gap-[14px]">
        <img
          src={avatar}
          alt="аватар"
          className="rounded-full object-cover h-[32px] w-[32px]"
        />
        <div className="flex flex-col">
          <p className="font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
            {row.name}
          </p>
          <p className="font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#969696]">
            {row.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Статус",
    render: (value) => <StatusItem text={String(value)} status="green" />,
  },
  { key: "last", title: "Последнее посещение", render:(value)=>(<p className="text-[#413F3F]">{value}</p>) },
  { key: "actions", title: "Действие" },
];

export const EmployeesTable = () => {
  return (
    <Table
      columns={columns}
      data={data}
      gridTemplateColumns="4fr 1fr 1fr 0.5fr"
    />
  );
};
