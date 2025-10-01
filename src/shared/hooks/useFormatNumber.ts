import { useCallback } from "react";

export const useFormatNumber = () => {
  const format = useCallback((value: string | number) => {
    let num: number;

    if (typeof value === "number") {
      num = value;
    } else if (typeof value === "string") {
      num = Number(value.replace(/\D/g, ""));
    } else {
      return value;
    }

    if (isNaN(num)) return value;

    return num.toLocaleString("ru-RU");
  }, []);

  return format;
};
