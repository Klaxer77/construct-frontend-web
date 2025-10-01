interface TableRow {
  id: string;
  name: string;
  project: string;
  responsible: string;
  status: "low" | "mid" | "high";
}

interface AttentionTableProps {
  data: TableRow[];
}

export const AttentionTable = ({ data }: AttentionTableProps) => {
  const statusData = {
    low: { text: "Низкий", color: "text-green" },
    mid: { text: "Средний", color: "text-orange" },
    high: { text: "Высокий", color: "text-red" },
  } as const;

  return (
    <div className="py-[24px] rounded-[20px] border border-borderGray shadow-[0px_0px_9.7px_0px_#00000003] h-[312px] flex flex-col gap-[30px] w-full">
      <h2 className="font-[700] text-[20px] tracking-[-0.2px] text-blackText ml-[20px]">
        Требует внимания
      </h2>

      <div className="overflow-y-auto ml-[20px] mr-[10px]">
        <table className="w-[99%] table-fixed border-collapse">
          <thead>
            <tr className="text-left text-[#515151] font-[800] text-[12px]">
              <th className="pr-[28px] w-[15px] ">№</th>
              <th className="pr-[14px] truncate ">Название</th>
              <th className="pr-[18px] truncate ">Проект</th>
              <th className="pr-[24px] w-[120px]">Ответственный</th>
              <th className="truncate w-[63px]">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const { text, color } = statusData[row.status];
              return (
                <tr
                  key={row.id}
                  className="border-b border-borderGray font-[600] text-[14px] leading-[24px] tracking-[-0.4px] text-[#272525]"
                >
                  <td className="pt-[16px] pb-[8px] pr-[28px] w-[15px]">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="pt-[16px] pb-[8px] pr-[14px] truncate ">
                    {row.name}
                  </td>
                  <td className="pt-[16px] pb-[8px] pr-[18px] truncate ">
                    {row.project}
                  </td>
                  <td className="pt-[16px] pb-[8px] pr-[24px] ">
                    {row.responsible}
                  </td>
                  <td
                    className={`pt-[16px] pb-[8px] w-[63px] ${color} truncate`}
                  >
                    {text}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
