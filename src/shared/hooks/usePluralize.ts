import { useCallback } from "react";

export const usePluralize = () => {
  const pluralize = useCallback(
    (count: number, forms: [string, string, string]) => {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return forms[2];
      }

      if (lastDigit === 1) return forms[0];
      if (lastDigit >= 2 && lastDigit <= 4) return forms[1];
      return forms[2];
    },
    []
  );

  return pluralize;
};
