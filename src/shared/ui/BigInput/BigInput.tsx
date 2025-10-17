import { useRef, useEffect } from "react";
import Inputmask from "inputmask";
import { Icon } from "../../assets/icons/icons";

interface BigInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "number";
  style?: "first" | "second";
  icon?: boolean;
}

export const BigInput = ({
  label,
  value,
  onChange,
  placeholder = "Введите",
  type = "text",
  style = "first",
  icon = true,
}: BigInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    Inputmask.remove(inputRef.current);

    if (type === "date" && inputRef.current) {
      Inputmask({
        mask: "99.99.9999",
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(inputRef.current);
    }
    if (type === "number") {
      Inputmask({
        regex: "[0-9.]*",
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(inputRef.current);
    }
  }, [type]);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <span
        className={` ${
          style === "second"
            ? "font-[600] text-[14px] leading-[22px] tracking-[-0.2px] text-[#A0A0A5]"
            : "font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-blackText"
        }`}
      >
        {label}
      </span>
      <div
        onClick={handleClick}
        className={`   relative flex items-center ${
          style === "second"
            ? "border-b border-borderGray h-[40px]"
            : "border border-borderGray rounded-[20px] px-[20px] h-[58px]"
        }`}
      >
        <input
          ref={inputRef}
          type={"text"}
          className={`h-full w-full outline-0  tracking-[-0.4px] text-blackText  ${
            style === "second"
              ? "font-[700] text-[18px] leading-[28px] placeholder:text-[#3D3D3D99]"
              : "font-[600] text-[16px] leading-[24px]placeholder:text-darkGray"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={
            onChange &&
            ((e) => {
              onChange(e.target.value);
            })
          }
        />
        {icon && (
          <Icon name="Pen" color="#007AFF" className="absolute right-[20px]" />
        )}
      </div>
    </div>
  );
};
