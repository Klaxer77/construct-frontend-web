import { columns, tableData } from "./data";

interface RowValue {
  status: "yes" | "no" | "not_required";
  id?: string;
  code?: string;
  title?: string;
  description: string;
}

export type ParamsValues = Record<string, RowValue>;

interface ParamsBlockProps {
  values: ParamsValues;
  onChange: (rowId: number, newValue: RowValue) => void;
  disabled?: boolean;
}

const GRID_TEMPLATE = "56px 2fr 80px 80px 150px 1fr";
const STATUSES: { key: RowValue["status"]; label: string }[] = [
  { key: "yes", label: "Да" },
  { key: "no", label: "Нет" },
  { key: "not_required", label: "Не требуется" },
];

export const ParamsBlock: React.FC<ParamsBlockProps> = ({
  values,
  onChange,
  disabled = false,
}) => {
  const renderRadio = (
    rowId: number,
    status: RowValue["status"],
    checked: boolean,
    label: string
  ) => (
    <label
      key={status}
      className={`inline-flex items-center ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <input
        className="sr-only"
        type="radio"
        name={`row-${rowId}`}
        checked={checked}
        readOnly={disabled}
        onChange={() =>
          !disabled && onChange(rowId, { ...values[rowId], status })
        }
        aria-label={label}
      />
      <span className="w-[24px] h-[24px] rounded-full flex items-center justify-center">
        {checked ? (
          <span
            className="w-[20px] h-[20px] rounded-full flex items-center justify-center"
            style={{ background: "#08875D" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M10.78 0.902136C11.2484 1.19485 11.3907 1.8118 11.098 2.28013L5.47303 11.2801C5.30222 11.5534 5.01018 11.7276 4.68855 11.7481C4.36693 11.7686 4.05515 11.6328 3.85107 11.3834L0.476073 7.25837C0.126345 6.83093 0.189347 6.2009 0.616792 5.85118C1.04424 5.50145 1.67426 5.56445 2.02399 5.9919L4.51603 9.03773L9.40203 1.22013C9.69474 0.751798 10.3117 0.609425 10.78 0.902136Z"
                fill="#ffffff"
              />
            </svg>
          </span>
        ) : (
          <span className="w-[18px] h-[18px] rounded-full border border-[#969696]" />
        )}
      </span>
    </label>
  );

  return (
    <div>
      <p className="font-[700] leading-[24px] text-[#404040] mb-[10px]">
        1. Наличие разрешительной, организационно-технологической, рабочей
        документации.
      </p>

      <div className="w-full flex flex-col gap-[8px]">
        <div
          className="grid items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
          style={{ gridTemplateColumns: GRID_TEMPLATE }}
        >
          {columns.map((col, index) => (
            <div
              key={String(col.key) + index}
              className={`px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-gray border-r border-borderGray last:border-0 h-full flex items-center ${
                ["Да", "Нет"].includes(col.title) ? "justify-center" : ""
              } ${col.title === "Описание" ? "justify-end" : ""}`}
            >
              {col.title || ""}
            </div>
          ))}
        </div>

        {tableData.map((row, index) => (
          <div key={row.id} className="flex flex-col">
            {index === 5 && (
              <p className="font-[700] leading-[24px] text-[#404040] mt-[10px] mb-[10px]">
                2. Инженерная подготовка строительной площадки
              </p>
            )}

            <div
              className="grid items-center border-b border-borderGray"
              style={{ gridTemplateColumns: GRID_TEMPLATE }}
            >
              <div className="px-[16px] py-[24px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-[#413F3F] text-center">
                {row.id}
              </div>

              <div className="px-[16px] py-[24px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                {row.title}
              </div>

              {STATUSES.map(({ key, label }) => (
                <div key={key} className="flex justify-center">
                  {renderRadio(
                    row.id,
                    key,
                    values[row.id]?.status === key,
                    label
                  )}
                </div>
              ))}

              <input
                placeholder="По требованию"
                value={values[row.id]?.description ?? ""}
                readOnly={disabled}
                onChange={(e) =>
                  !disabled &&
                  onChange(row.id, {
                    ...values[row.id],
                    description: e.target.value,
                  })
                }
                className={`w-full h-[58px] pl-[20px] flex items-center border border-[#E8E6EA] rounded-[15px] text-[14px] leading-[24px] font-[550] text-[#000000]/50 outline-none ${
                  disabled ? "cursor-default" : "cursor-text"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
