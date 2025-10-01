import { useState } from "react";

export const Support = () => {
  const [isRu, setIsRu] = useState(true);

  const texts = {
    ru: {
      title: "Поддержка",
      text: (
        <>
          Если у вас есть вопросы, напишите нам на{" "}
          <a
            href="mailto:support@toolsdev.org"
            className="text-[#007AFF] font-[800]"
          >
            support@toolsdev.org
          </a>
        </>
      ),
    },
    en: {
      title: "Support",
      text: (
        <>
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:support@toolsdev.org"
            className="text-[#007AFF] font-[800]"
          >
            support@toolsdev.org
          </a>
        </>
      ),
    },
  };

  const t = isRu ? texts.ru : texts.en;

  return (
    <div className="px-[100px] py-[120px] text-black text-[24px] font-[600] leading-[32px]">
      <div className="flex justify-between items-center mb-[36px]">
        <img className="w-[356px] h-[56px]" src="/Logo.webp" />

        <div
          onClick={() => setIsRu(!isRu)}
          className={`w-[140px] h-[70px] rounded-[36px] cursor-pointer flex items-center p-[4px] transition-all duration-300 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]
${isRu ? "bg-[#F3F3F3]" : "bg-[#007AFF]"}`}
        >
          <div
            className={`rounded-full text-[32px] font-[700] leading-[43px] w-[66px] h-[64px] flex justify-center items-center transition-all duration-300
${
  isRu
    ? "bg-[#007AFF] text-white"
    : "bg-white text-[#4F4F4F] translate-x-[66px]"
}`}
          >
            {isRu ? "RU" : "EN"}
          </div>
        </div>
      </div>

      <p className="font-[800] text-[32px] leading-[32px] mb-[30px]">
        {t.title}
      </p>
      <p className="mt-[30px]">{t.text}</p>
    </div>
  );
};
