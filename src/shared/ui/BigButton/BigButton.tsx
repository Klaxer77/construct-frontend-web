import "./loader.css";

interface BigButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const BigButton = ({
  text,
  onClick,
  loading,
  disabled,
  type = "button",
}: BigButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`max-w-[432px] h-[66px] bg-blueSideBarActive hover:bg-hoverBlue active:bg-pressedBlue disabled:bg-disabled ${
        loading && "!bg-blueSideBarActive"
      } transition rounded-[20px] font-[600] text-[20px] leading-[30px] tracking-[-0.4px] text-white cursor-pointer`}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-[2px]">
          <span className="button-dot button-dot-first bg-[#98C9FF]"></span>

          <div className="flex items-center gap-[12px]">
            <span className="button-dot button-dot-fourth bg-white"></span>
            <span className="button-dot button-dot-second bg-white"></span>
          </div>

          <span className="button-dot button-dot-third bg-[#98C9FF]"></span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};
