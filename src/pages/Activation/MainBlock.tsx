import { useState } from "react";
import { Input } from "../../shared";
import { useParams } from "react-router";
import { useFormatDate } from "../../shared/hooks/useFormatDate";

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M10.6663 0.70212C10.1122 0.149767 9.21412 0.150109 8.66042 0.702883L7.48047 1.88085L11.2693 5.65762L12.447 4.45319C12.9893 3.89856 12.9836 3.01198 12.4342 2.46434L10.6663 0.70212Z"
      fill="#007AFF"
    />
    <path
      opacity="0.3"
      d="M13.4238 12.5566C13.7416 12.5566 13.999 12.8141 13.999 13.1318C13.999 13.4496 13.7416 13.707 13.4238 13.707L8.05469 13.707C7.73718 13.7068 7.47852 13.4494 7.47852 13.1318C7.47852 12.8143 7.73718 12.5569 8.05469 12.5566L13.4238 12.5566Z"
      fill="#007AFF"
    />
    <path
      opacity="0.3"
      d="M10.5482 6.70956L6.41783 2.58885L1.3434 7.65914C0.933655 8.06855 0.692758 8.61661 0.668379 9.19487L0.577217 11.3571C0.549543 12.0135 1.07503 12.5608 1.73303 12.5608L3.85646 12.5609C4.48014 12.5609 5.07742 12.3095 5.5129 11.8638L10.5482 6.70956Z"
      fill="#007AFF"
    />
  </svg>
);

export const MainBlock = ({ company }: { company: string }) => {
  const { name } = useParams();
  const { formatDate } = useFormatDate();
  const [objectValue, setObjectValue] = useState(name);
  const [siteValue, setSiteValue] = useState("Адресный ориентир");
  const [contractorValue, setContractorValue] = useState(company);
  const [checkDateValue, setCheckDateValue] = useState(
    formatDate(new Date().toISOString())
  );

  return (
    <div>
      <p className="font-[700] text-[24px] leading-[36px] mb-[4px] text-[#3A3A3A]">
        Проектные данные
      </p>
      <p className="text-[#6A6A6A] font-[510]">Заполните поля ниже</p>

      <form className="mt-[20px] flex flex-col gap-[16px]">
        <Input
          label="Объект"
          fullWidth
          icon={svg}
          placeholder="Заполните"
          value={objectValue}
          onChange={setObjectValue}
        />
        <Input
          label="Участок производства работ (адресный ориентир)"
          fullWidth
          icon={svg}
          placeholder="Заполните"
          value={siteValue}
          onChange={setSiteValue}
        />

        <Input
          icon={svg}
          label="Подрядчик"
          fullWidth
          value={`Строительная компания “${contractorValue}”`}
          onChange={setContractorValue}
        />

        <Input
          label="Дата проверки"
          fullWidth
          icon={svg}
          placeholder="Заполните"
          value={checkDateValue}
          onChange={setCheckDateValue}
        />
      </form>
    </div>
  );
};
