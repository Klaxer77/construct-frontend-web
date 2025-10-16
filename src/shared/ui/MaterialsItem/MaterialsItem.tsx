import { useState } from "react";
import { Icon } from "../../assets/icons/icons";
import { useFormatDate } from "../../hooks/useFormatDate";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";
interface SubMaterials {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
}
interface MaterialsItemProps {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  object_id?: string;
  object_title?: string;
  subcategories: SubMaterials[];
}

export const MaterialsItem = ({
  title,
  date_from,
  date_to,
  subcategories,
  object_id,
  object_title,
}: MaterialsItemProps) => {
  const [expose, setExpose] = useState(false);
  const { formatDate } = useFormatDate();
  const navigate = useNavigate();
  return (
    <div
      className={` transition-all overflow-hidden ${
        expose ? "h-max" : "h-[79px]"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer py-[16px] border-b border-borderGray"
        onClick={() => setExpose(!expose)}
      >
        <div className="flex flex-col gap-[12px]">
          <p className="font-[700] text-[16px] leading-[16px] tracking-[-0.4px] text-[#3D3D3D]">
            {title}
          </p>
          <p className="font-[600] text-[14px] leading-[12px] tracking-[-0.28px] text-[#00000080]">
            {formatDate(date_from)} - {formatDate(date_to)}
          </p>
        </div>
        <Icon
          name="TickBottom"
          color="#007AFF"
          className={`transition ${expose && "rotate-180"}`}
        />
      </div>
      {subcategories.map((item, index) => (
        <div key={index} className=" pt-[16px] ">
          <div className="flex items-center justify-between pb-[16px] border-b border-borderGray">
            <p className="font-[600] text-[14px] leading-[20px] tracking-[-0.2px] text-[#585757] max-w-[300px]">
              {item.title}
            </p>
            <div className="flex items-center gap-[49px] pr-[49px]">
              <p className="font-[600] text-[14px] leading-[24px] tracking-[-0.2px] text-[#585757]">
                895,00
              </p>
              <p className="font-[600] text-[14px] leading-[24px] tracking-[-0.2px] text-[#413F3F]">
                Погонный метр
              </p>
            </div>
          </div>

          <Button
            text="Открыть"
            className="mt-[14px] rounded-[15px] h-[43px] font-[700] text-[15px]"
            onClick={() =>
              navigate(
                `/objects/material/${object_title}?object_id=${object_id}&material_id=${item.id}&material_title=${title}`
              )
            }
          />
        </div>
      ))}
    </div>
  );
};
