import { api } from "./config";

interface Company {
  id: string;
  title: string;
}

interface GetCompanyStatusResponse {
  id: string;
  title: string;
  city: string;
  updated_at: string;
  status: string;
  responsible_user: {
    fio: string;
  };
  coords: number[][][] | number[][];
}

export const getCurrentCompany = async (): Promise<Company> => {
  const response = await api.get("/company/current");
  return response.data.data;
};

export const getCompanyStatus = async (
  company_id: string
): Promise<GetCompanyStatusResponse[]> => {
  const response = await api.get(`/company/dashboard/status/${company_id}`);
  return response.data.data;
};
