import { useQuery } from "@tanstack/react-query";
import { getCompanyStatus, getCurrentCompany } from "../api/companyApi";

export const useCurrentCompany = () =>
  useQuery({
    queryKey: ["currentCompany"],
    queryFn: getCurrentCompany,
  });

export const useCompanyStatus = (companyId: string) =>
  useQuery({
    queryKey: ["companyStatus", companyId],
    queryFn: () => getCompanyStatus(companyId),
    enabled: !!companyId,
  });
