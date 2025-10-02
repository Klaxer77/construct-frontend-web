import { api } from "./config";

interface AllViolationsResponsse {
  id: string;
  object_name: string;
  responsible_user_name: string;
  status: string;
  date_violation: string;
  expiration_date: string;
}

interface Photos {
  file_path: string;
}

export interface Violations {
  id: string;
  violations: string;
  name_regulatory_docx: string;
  comment: string;
  status: string;
  expiration_date: string;
  photos: Photos[];
}

interface ViolationResponse {
  id: string;
  status: "fixed" | "not_fixed" | "review";
  date_violation: string;
  expiration_date: string;
  object_name: string;
  violations: Violations[];
}

export const getAllViolations = async (
  object_id: string
): Promise<AllViolationsResponsse[]> => {
  const response = await api.get(`/violations/all/${object_id}`);
  return response.data.data;
};

export const changeViolationStatus = async (
  violation_id: string,
  action: "accept" | "deny"
): Promise<{ result: string }> => {
  const response = await api.post(`/violations/change/status/${violation_id}`, {
    action,
  });

  return response.data.data;
};

export const getViolationById = async (
  violation_id: string
): Promise<ViolationResponse> => {
  const response = await api.get(`/violations/detail/${violation_id}`);
  return response.data.data;
};
