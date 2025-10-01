interface ProgressBarProps {
  value: number;
  style: "blue" | "green" | "red"|'gray';
}

export const ProgressBar = ({ value, style }: ProgressBarProps) => {
  const progressStyles = {
    blue: { bg: "bg-lightBlue", fill: "bg-blue" },
    green: { bg: "bg-lightGreen", fill: "bg-green" },
    red: { bg: "bg-lightRed", fill: "bg-red" },
    gray: { bg: "bg-[#E0E0E0]", fill: "bg-[#E0E0E0]" },
  } as const;

  const { bg, fill } = progressStyles[style];
  return (
    <div className={`w-full h-[10px] rounded-[10px] ${bg} overflow-hidden`}>
      <div
        className={`h-full  rounded-[10px] ${fill} transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};
