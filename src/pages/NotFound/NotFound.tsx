import { useNavigate } from "react-router";
import { Icon } from "../../shared";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-[24px]">
        <h1 className=" text-9xl font-bold ">404</h1>
        <p className=" text-2xl ">Страница не найдена</p>
        <button
          onClick={() => navigate("/")}
          className="  flex items-center font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-darkGray cursor-pointer"
        >
          <Icon name="TickRight" className=" rotate-180" />
          На главную
        </button>
      </div>
    </div>
  );
};
