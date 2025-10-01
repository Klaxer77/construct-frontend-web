import { useRef, useEffect } from "react";
import Inputmask from "inputmask";
import { Icon } from "../../assets/icons/icons";

interface BigInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date";
}

export const BigInput = ({
  label,
  value,
  onChange,
  placeholder = "Введите",
  type = "text",
}: BigInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (type === "date" && inputRef.current) {
      Inputmask({
        mask: "99.99.9999",
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
      <span className="font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-blackText">
        {label}
      </span>
      <div
        onClick={handleClick}
        className="px-[20px] h-[58px] border border-borderGray rounded-[20px] relative flex items-center"
      >
        <input
          ref={inputRef}
          type="text"
          className="h-full w-full outline-0 font-[600] text-[16px] leading-[24px] tracking-[-0.4px] text-blackText placeholder:text-darkGray"
          placeholder={placeholder}
          value={value}
          onChange={
            onChange &&
            ((e) => {
              onChange(e.target.value);
            })
          }
        />
        <Icon name="Pen" color="#007AFF" className="absolute right-[20px]" />
      </div>
    </div>
  );
};
