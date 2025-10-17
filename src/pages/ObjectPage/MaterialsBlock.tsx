import { Icon } from "../../shared";
import { useMaterials } from "../../shared/hooks/useMaterials";
import { MaterialsItem } from "../../shared/ui/MaterialsItem/MaterialsItem";

export const MaterialsBlock = ({
  object_id,
  object_title,
}: {
  object_id?: string;
  object_title?: string;
}) => {
  const { data: materials } = useMaterials(object_id ?? "");
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex items-center justify-between">
        <h2 className="font-[700] text-[20px] leading-[30px] tracking-[-0.4px] text-[#1C1C1C]">
          Состав работ
        </h2>
        <div className="flex items-center gap-[20px]">
          <p className="max-w-[275px] text-right font-[700] text-[15px] leading-[22px] tracking-[-0.2px] text-[#1C1C1C]">
            Приемка материалов
            <br /> доступно в мобильном приложении
          </p>
          <Icon name="Phone" />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {materials?.map((item, index) => (
          <MaterialsItem
            {...item}
            object_id={object_id}
            object_title={object_title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
