import { useRef, useState, type ReactElement } from "react";
import { Icon } from "../../shared";

interface LoginInputProps {
  icon?: ReactElement;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "role" | "email";
  roleText?: string;
  placeholder?: string;
  verified?: boolean;
  error?: string;
}

export const LoginInput = ({
  icon,
  label,
  value,
  onChange,
  type = "text",
  roleText,
  placeholder,
  verified,
  error,
}: LoginInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-[10px]">
      <div
        onClick={handleClick}
        className={`p-[16px] border rounded-[20px] flex items-center justify-between gap-[10px] transition ${
          focused ? "border-blueSideBarActive" : "border-borderGray"
        }`}
      >
        <div>{icon}</div>

        <div className="flex flex-col pl-[10px] border-l border-borderGray w-full">
          <p className="font-[600] text-[14px] leading-[22px] tracking-[-0.4px] text-gray">
            {label}
          </p>
          {type === "role" ? (
            <p className="font-[600] text-[18px] leading-[28px] tracking-[-0.4px] text-darkGray">
              {roleText}
            </p>
          ) : (
            <input
              className="font-[700] text-[18px] leading-[28px] tracking-[-0.4px] text-black placeholder:text-darkGray placeholder:font-[600] outline-none"
              ref={inputRef}
              type={type == "password" && showPassword ? "text" : type}
              value={value}
              onChange={
                onChange &&
                ((e) => {
                  onChange(e.target.value);
                })
              }
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
            />
          )}
        </div>
        {type == "password" && value && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="cursor-pointer"
          >
            <Icon color="black" name={showPassword ? "Eye" : "EyeClosed"} />
          </button>
        )}
        {verified && <Icon name="Verified" />}
      </div>
      {error && (
        <p className="font-[600] text-[16px] leading-[26px] tracking-[-0.4px] text-redError">
          {error}
        </p>
      )}
    </div>
  );
};
