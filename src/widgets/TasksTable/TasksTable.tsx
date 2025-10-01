import { useState } from "react";
import {
  Button,
  CheckBoxSmall,
  StatusItem,
  Table,
  type Column,
} from "../../shared";
import { data, type ObjectItem } from "./data";

interface TaskTableProps {
  subMenu?: boolean;
}

export const TasksTable = ({ subMenu = true }: TaskTableProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "sprints" | "checkpoints">(
    "all"
  );
  const [selected, setSelected] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((_, i) => i));
    }
  };

  const isAllChecked = selected.length === data.length && data.length > 0;

  const columns: Column<ObjectItem>[] = [
    {
      key: "select",
      title: <CheckBoxSmall checked={isAllChecked} onClick={toggleAll} />,
      render: (_: unknown, __: ObjectItem, index: number) => (
        <CheckBoxSmall
          checked={selected.includes(index)}
          onClick={() => toggleRow(index)}
        />
      ),
    },
    {
      key: "number" as const,
      title: "№",
      render: (_: unknown, __: ObjectItem, index: number) => (
        <p className="font-[800] text-[#413F3F]">{index + 1}</p>
      ),
    },
    { key: "theme" as const, title: "Тема" },
    { key: "responsible" as const, title: "Исполнитель" },
    {
      key: "sprint" as const,
      title: "Спринт",
      render: (value: string | number | undefined) => (
        <StatusItem text={String(value)} status="blue" />
      ),
    },
    {
      key: "kt" as const,
      title: "КТ",
      render: (value: string | number | undefined) => {
        return <StatusItem text={String(value)} status="blue" />;
      },
    },
    {
      key: "author" as const,
      title: "Автор",
      render: (value) => <p className="text-[#413F3F]">{value}</p>,
    },
    { key: "deadline" as const, title: "Сдача" },
    {
      key: "status" as const,
      title: "Статус",
      render: (value: string | number | undefined) => (
        <StatusItem text={String(value)} status="blue" />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      {subMenu && (
        <div className="flex items-center gap-[10px]">
          <Button
            text="Все"
            onClick={() => setActiveTab("all")}
            style={activeTab === "all" ? "blue" : "white"}
            className="h-[45px] text-[16px]"
          />
          <Button
            text="Спринты"
            onClick={() => setActiveTab("sprints")}
            style={activeTab === "sprints" ? "blue" : "white"}
            className="h-[45px] text-[16px]"
          />
          <Button
            text="Контрольные точки"
            onClick={() => setActiveTab("checkpoints")}
            style={activeTab === "checkpoints" ? "blue" : "white"}
            className="h-[45px] text-[16px]"
          />
        </div>
      )}

      <Table
        columns={columns}
        data={data}
        gridTemplateColumns="56px 52px 2fr 1fr 1fr 1fr 1fr 1fr 0.6fr"
      />
    </div>
  );
};
