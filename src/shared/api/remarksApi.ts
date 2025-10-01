import { api } from "./config";

interface AllRemarksResponsse {
  id: string;
  object_name: string;
  responsible_user_name: string;
  status: string;
  date_remark: string;
  expiration_date: string;
}

export interface CreateRemarkRequest {
  violations: string;
  name_regulatory_docx: string;
  expiration_date: string;
  comment: string;
  photos_keys: string[];
}

interface CreateRemarkResponse {
  violations: string;
  name_regulatory_docx: string;
  expiration_date: string;
  comment: string;
  photos_keys: string[];
  id: string;
  status: string;
}

interface Photos {
  file_path: string;
}

export interface Remarks {
  violations: string;
  name_regulatory_docx: string;
  comment: string;
  status: string;
  expiration_date: string;
  photos: Photos[];
}

interface RemarkResponse {
  id: string;
  status: "fixed" | "not_fixed" | "review";
  date_remark: string;
  expiration_date: string;
  object_name: string;
  remarks: Remarks[];
}

export const getAllRemarks = async (
  object_id: string
): Promise<AllRemarksResponsse[]> => {
  const response = await api.get(`/remarks/all/${object_id}`);
  return response.data.data;
};

export const changeRemarkStatus = async (
  remark_id: string,
  action: "accept" | "deny"
): Promise<{ result: string }> => {
  const response = await api.post(`/remarks/change/status/${remark_id}`, {
    action,
  });

  return response.data.data;
};

export const createRemark = async (
  objectId: string,
  latitude: number,
  longitude: number,
  userData: CreateRemarkRequest[],
  files: File[]
): Promise<CreateRemarkResponse[]> => {
  const formData = new FormData();

  formData.append("user_data", JSON.stringify(userData));

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post(`/remarks/create/${objectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    },
  });

  return response.data.data;
};

export const getRemarkById = async (
  remark_id: string
): Promise<RemarkResponse> => {
  const response = await api.get(`/remarks/detail/${remark_id}`);
  return response.data.data;
};
