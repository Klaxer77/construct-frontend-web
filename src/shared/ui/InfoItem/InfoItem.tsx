import { Icon } from "../..";
import staff from "/img/Staff.png";

interface InfoItemProps {
  title: string | number;
  subtitle: string;
  status: "stable" | "fast";
  text: string;
  currency?: boolean;
  img?: boolean;
  className?: string;
  statusClassName?: string;
}

export const InfoItem = ({
  title,
  subtitle,
  status,
  currency,
  text,
  img,
  className,
  statusClassName,
}: InfoItemProps) => {
  const statusData = {
    stable: { color: "#5F9281" },
    fast: { color: "#AF3B45" },
  } as const;

  const { color } = statusData[status];
  return (
    <div
      className={`flex gap-[16px] px-[20px] py-[24px] border border-borderGray w-max min-w-max rounded-[20px] shadow-[0px_0px_9.7px_0px_#00000003] ${className}`}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <p className="font-[700] text-[26px] leading-[36px] tracking-[-0.4px] text-blackText">
            {title} {currency && "₽"}
          </p>
          <p
            className={`font-[600] text-[16px] leading-[24px] text-blackText ${statusClassName}`}
          >
            {subtitle}
          </p>
        </div>
        <p className="flex items-center font-[600] text-[12px] leading-[20px] text-gray70">
          {text}
          <Icon name="ArrowTop" color={color} />
        </p>
      </div>
      {img && (
        <div className="w-[50px] h-[50px] rounded-full bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
          <img
            src={staff}
            alt="Staff"
            className="w-[40px] h-[40px] object-cover"
          />
        </div>
      )}
    </div>
  );
};
