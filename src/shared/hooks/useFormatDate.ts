import { useCallback } from "react";
import { parseISO, format } from "date-fns";

export const useFormatDate = () => {
  const formatDate = useCallback(
    (isoString: string | null | undefined) => {
      if (!isoString) return "";
      try {
        const date = parseISO(isoString);
        return format(date, "dd.MM.yyyy");
      } catch {
        return "";
      }
    },
    []
  );

  return { formatDate };
};
