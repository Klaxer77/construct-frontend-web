import { useRef, type ReactElement } from "react";
import { Icon } from "../../assets/icons/icons";

interface FileInputProps {
  label: string;
  placeholder?: string;
  icon?: ReactElement;
  file?: File | null;
  onChange?: (file: File | null) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export const FileInput = ({
  icon,
  label,
  placeholder = "Выберите файл",
  file,
  onChange,
  onClear,
  disabled,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange?.(selectedFile);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-[16px] border rounded-[20px] flex items-center justify-between gap-[10px] transition border-borderGray relative`}
    >
      <div>{icon}</div>

      <div className="flex flex-col pl-[10px] border-l border-borderGray w-full">
        <p className="font-[600] text-[14px] leading-[22px] tracking-[-0.4px] text-gray">
          {label}
        </p>

        <input
          className=" opacity-0 absolute inset-0"
          ref={inputRef}
          type="file"
          accept="application/pdf,image/*"
          onChange={handleChange}
          disabled={disabled}
        />
        <p
          className={`font-[600] text-[18px] leading-[28px] tracking-[-0.4px] ${
            file ? "text-blackText" : "text-darkGray"
          }  outline-none`}
        >
          {file?.name || placeholder}
        </p>
      </div>
      {file && onClear && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="cursor-pointer z-10"
        >
          <Icon name="Delete" />
        </button>
      )}
    </div>
  );
};
