import { useEffect, useState } from "react";
import { Icon } from "../../shared";
import { LoginForm } from "../../widgets";
import bg1 from "/img/bg1.png";
import bg2 from "/img/bg2.png";
import bg3 from "/img/bg3.png";
import bg4 from "/img/bg4.png";
import bg5 from "/img/bg5.png";
import { useUserStore } from "../../shared/stores/userStore";
import { useNavigate } from "react-router";

const images = [bg1, bg2, bg3, bg4, bg5];

export const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex items-center justify-between relative p-[30px] h-dvh overflow-hidden">
      <div className="w-full flex items-center justify-center z-10">
        <LoginForm />
      </div>

      <div className="relative w-full h-full flex justify-end">
        <Icon
          name="MadeByTools"
          className="absolute top-[30px] right-[30px] z-20"
        />

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`фото ${index + 1}`}
            className={`absolute top-0 right-0 h-full transition-opacity duration-[2000ms] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
          />
        ))}
      </div>

      <div className="flex items-center gap-[8px] absolute top-[30px] left-[30px] z-20">
        <Icon name="Logo" /> <Icon name="LogoText" />
      </div>
      <p className="font-[700] text-[16px] leading-[28px] tracking-[-0.4px] text-gray absolute bottom-[30px] left-[30px] z-20">
        Система управления строительством
      </p>
    </div>
  );
};
