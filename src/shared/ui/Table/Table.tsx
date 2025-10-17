import type { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  title?: string | ReactNode;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  gridTemplateColumns?: string;
  classNameColumn?: string;
  classNameRow?: string;
  classNameColItem?: string;
}

export const Table = <T extends object>({
  columns,
  data,
  gridTemplateColumns,
  classNameColumn,
  classNameRow,
  classNameColItem
}: TableProps<T>) => {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div
        className={`grid items-center h-[52px] bg-[#F9F8F8] border border-borderGray rounded-t-[10px] ${classNameColumn}`}
        style={{ gridTemplateColumns }}
      >
        {columns.map((col, i) => (
          <div
            key={i}
            className={`px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#969696] border-r border-borderGray last:border-0 h-full flex items-center ${classNameColItem}`}
          >
            {col.title || ""}
          </div>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid items-center border-b border-borderGray min-h-[64px] ${classNameRow}`}
          style={{ gridTemplateColumns }}
        >
          {columns.map((col, colIndex) => {
            const value = row[col.key];
            return (
              <div
                key={colIndex}
                className={`px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757] flex items-center`}
              >
                {col.render
                  ? col.render(value, row, rowIndex)
                  : (value as ReactNode)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
