interface StatusItemProps {
  text: string;
  status:
    | "green"
    | "greenDark"
    | "blue"
    | "red"
    | "gray"
    | "yellow"
    | "lightBlue"
    | "darkRed"
    | "darkYellow";
}

export const StatusItem = ({ text, status }: StatusItemProps) => {
  const statusStyles = {
    green: { bgColor: "bg-[#DFEFDE]", textColor: "text-[#00691E]" },
    greenDark: { bgColor: "bg-[#08875D26]", textColor: "text-[#08875D]" },
    blue: { bgColor: "bg-lightBlue", textColor: "text-blueSideBarActive" },
    lightBlue: { bgColor: "bg-[#D0F4FF]", textColor: "text-[#093E8C]" },
    red: { bgColor: "bg-lightRed", textColor: "text-red" },
    darkRed: { bgColor: "bg-[#FF9385]", textColor: "text-[#AD0600]" },
    gray: { bgColor: "bg-bgGray", textColor: "text-gray70" },
    yellow: { bgColor: "bg-yellow", textColor: "text-darkYellow" },
    darkYellow: { bgColor: "bg-[#FFF2D4]", textColor: "text-[#735400]" },
  } as const;

  const { bgColor, textColor } = statusStyles[status];

  return (
    <div
      className={`h-[32px] px-[8px] w-max rounded-[4px] flex items-center justify-center ${bgColor}`}
    >
      <p
        className={`font-[600] text-[14px] leading-[24px] tracking-[-0.4px] ${textColor}`}
      >
        {text}
      </p>
    </div>
  );
};
