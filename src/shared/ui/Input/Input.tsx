import { useRef, type ReactElement, } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "email" | "password" | "text" | "number" | "tel" | "file";
  disabled?: boolean;
  isValid?: boolean | null;
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  icon?: ReactElement;
  className?: string;
}

export const Input = ({
  label,
  placeholder,
  type = "text",
  disabled = false,
  isValid = null,
  value = "",
  fullWidth,
  icon,
  className,
  onChange,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const getInputMode = () => {
    switch (type) {
      case "email":
        return "email";
      case "password":
        return "text";
      case "tel":
        return "tel";
      default:
        return "text";
    }
  };

  const getSuccessMessage = () => {
    switch (type) {
      case "email":
        return "Верная почта";
      case "password":
        return "Верный пароль";
      case "tel":
        return "Корректный номер";
      default:
        return "Корректные данные";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      let newValue = e.target.value;

      if (type === "tel") {
        newValue = newValue.replace(/\D/g, "");
        if (newValue.startsWith("7")) {
          newValue = newValue.substring(1);
        }
      }

      onChange(newValue);
    }
  };

  const formatDisplayValue = () => {
    if (type !== "tel" || !value) return value;

    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "";

    let formatted = "+7 ";

    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += " " + cleaned.substring(3, 6);
    }
    if (cleaned.length > 6) {
      formatted += "-" + cleaned.substring(6, 8);
    }
    if (cleaned.length > 8) {
      formatted += "-" + cleaned.substring(8, 10);
    }

    return formatted;
  };


  return (
    <div
      className={`gap-2 flex flex-col w-[440px] relative ${
        fullWidth && "w-full"
      } ${className}`}
    >
      {icon && <div className="absolute right-[20px] top-[50px]">{icon}</div>}
      <div className=" flex justify-between">
        <label className="text-[#404040] font-[700] leading-[24px]">
          {label}
        </label>

        {isValid && (
          <label className="font-normal text-[12px] text-greenCorrect">
            {getSuccessMessage()}
          </label>
        )}
      </div>

      <input
      readOnly
        ref={inputRef}
        className={` border border-[#E8E6EA] rounded-[15px] px-[16px] py-[12px] text-[#6A6A6A] placeholder-[#6A6A6A] outline-0 leading-[24px] font-[600] ${
          disabled && "text-disabledAdmin"
        } ${
          type === "number" &&
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }`}
        type='text'
        inputMode={getInputMode()}
        placeholder={placeholder}
        disabled={disabled}
        value={type === "tel" ? formatDisplayValue() : value}
        onChange={handleChange}
      />
      {isValid === false && (
        <label className="font-normal text-[12px] text-redError text-right">
          Некорректные данные
        </label>
      )}
    </div>
  );
};
