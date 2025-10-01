interface Tab {
  label: string;
  value: string;
}

interface TabsControlProps {
  tabs: Tab[];
  active: string;
  onChange: (val: string) => void;
}

export const TabsControl = ({ tabs, active, onChange }: TabsControlProps) => {
  return (
    <div className="flex items-center justify-between">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`h-[40px] w-full font-[600] text-[16px] leading-[24px] tracking-[-0.2px] cursor-pointer transition
            ${
              active === tab.value
                ? "text-blueSideBarActive shadow-[0px_-2px_0px_0px_#0084FF_inset] font-[700]"
                : "text-[#585757] shadow-[0px_-1px_0px_0px_#E8E8E8_inset]"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
