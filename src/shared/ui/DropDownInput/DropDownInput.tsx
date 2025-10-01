'use client';

import { useState, type ReactElement } from "react";

interface DropDownInputProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  icon?: ReactElement;
  className?: string;
  disabled?: boolean;
  isValid?: boolean | null;
}

export const DropDownInput = ({
  label,
  options,
  value = "",
  onChange,
  fullWidth,
  icon,
  className,
  disabled = false,
  isValid = null,
}: DropDownInputProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  const getSuccessMessage = () => {
    return "Выбран корректный вариант";
  };

  return (
    <div
      className={`gap-2 flex flex-col w-[440px] relative ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {icon && <div className="absolute right-[20px] top-[50px]">{icon}</div>}

      <div className="flex justify-between">
        <label className="text-[#404040] font-[700] leading-[24px]">{label}</label>

        {isValid && (
          <label className="font-normal text-[12px] text-greenCorrect">
            {getSuccessMessage()}
          </label>
        )}
      </div>

      <div
        className={`border border-[#E8E6EA] rounded-[15px] px-[16px] py-[12px] text-[#6A6A6A] placeholder-[#6A6A6A] outline-0 leading-[24px] font-[600] cursor-pointer ${
          disabled ? "text-disabledAdmin" : ""
        }`}
        onClick={() => !disabled && setOpen(!open)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : "Выберите вариант"}
      </div>

      {open && !disabled && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border border-[#E8E6EA] bg-white shadow-lg">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#6A6A6A] font-[600]"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {isValid === false && (
        <label className="font-normal text-[12px] text-redError text-right">
          Некорректные данные
        </label>
      )}
    </div>
  );
};
