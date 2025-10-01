import { useRef } from "react";
import { Icon } from "../../assets/icons/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: "white" | "gray";
  className?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Введите название",
  style = "white",
  className
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleIconClick}
      className={` rounded-[14px] flex items-center gap-[10px] h-[44px] px-[16px] w-[372px] cursor-text ${className} ${
        style === "white" ? "bg-white border border-borderGray" : "bg-[#F7F9FB]"
      }`}
    >
      <Icon name="Search" />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="outline-none h-full w-full font-[600] text-[16px] leading-[24px] tracking-[-0.2px]"
      />
    </div>
  );
};
