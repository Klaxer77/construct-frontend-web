import { api } from "./config";

interface Object {
  id: string;
  using_id: string;
  status: string;
  object_type: string;
  created_at: string;
  updated_at: string;
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string;
  start_date: string;
}

export interface ActDocx {
  code: string;
  title: string;
  description: string;
  status: "yes" | "no" | "not_required";
}

export interface CheckListRequest {
  contractor_id: string;
  date_verification: string;
  act_docx: ActDocx[];
}

interface CheckListResponse {
  id: string;
  file_url: string;
  status: string;
  date_verification: string;
}

interface ProjectObject {
  id: string;
  using_id: string;
  status: string;
  object_type: string;
  title: string;
  general_info: string;
  responsible_user_id: string;
  city: string;
  date_delivery_verification: string;
  responsible_user: {
    fio: string;
  };
  act: {
    status: string;
    file_url: string;
  };
  check_list: {
    status: string;
  };
  is_nfc: boolean;
}

interface ObjectCategory {
  id: string;
  title: string;
}

interface ObjectsCountResponse {
  count: number;
}

export interface CreateObjectRequest {
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string;
  start_date: string;
  coords: number[][][] | number[][];
}

interface CreateObjectResponse {
  id: string;
  using_id: string;
  status: string;
  object_type: string;
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string;
  start_date: string;
  coords: number[][][] | number[][];
  created_at: string;
  updated_at: string;
}

interface SendFileResponse {
  id: string;
  file_url: string;
  status: string;
  date_verification: string;
}

interface ResponsibleUser {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  access_expires_at: string;
  email: string;
  fio: string;
  role: string;
}

interface GetObjectByIdResponse {
  id: string;
  using_id: string;
  status: string;
  object_type: string;
  created_at: string;
  updated_at: string;
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string;
  start_date: string;
  coords: number[][][] | number[][];
  responsible_user: ResponsibleUser;
}

export interface Docs {
  id: string;
  code: string;
  title: string;
  status: "yes" | "no" | "not_required";
  description: string;
}
interface AgreementResponse {
  id: string;
  file_url: string;
  status: string;
  date_verification: string;
  responsible_fio: string;
  contractor_title: string;
  documents: Docs[];
}

export const changeObjectAct = async (
  objectId: string,
  action: "accept" | "deny"
): Promise<Object> => {
  const response = await api.post(`/objects/act/change/${objectId}`, null, {
    params: { action },
  });

  return response.data.data;
};

export const changeCheckList = async (
  objectId: string,
  action: "accept" | "deny"
): Promise<Object> => {
  const response = await api.post(
    `/objects/checklist/change/${objectId}`,
    null,
    {
      params: { action },
    }
  );

  return response.data.data;
};

export const getCheckList = async (
  objectId: string
): Promise<AgreementResponse> => {
  const response = await api.get(`/objects/checkList/${objectId}`);
  return response.data.data;
};

export const createCheckList = async (
  objectId: string,
  payload: CheckListRequest
): Promise<CheckListResponse> => {
  const response = await api.post(
    `/objects/activate/checkList/${objectId}`,
    payload
  );

  return response.data.data;
};

export const getObjects = async (
  filterBy: "all" | "active" | "not_active" | "agreement" | "act_opening",
  companyId: string
): Promise<ProjectObject[]> => {
  const response = await api.get(`/objects/all/${filterBy}/${companyId}`);
  return response.data.data;
};

export const getObjectCategories = async (): Promise<ObjectCategory[]> => {
  const response = await api.get("/objects/categories");
  return response.data.data;
};

export const getObjectsCount = async (
  filterBy: "active" | "not_active" | "agreement" | "act_opening",
  companyId: string,
  categoryId: string | null = null
): Promise<ObjectsCountResponse> => {
  const response = await api.get(`/objects/count/${filterBy}/${companyId}`, {
    params: { category_id: categoryId },
  });

  return response.data.data;
};

export const createObject = async (
  companyId: string,
  payload: CreateObjectRequest
): Promise<CreateObjectResponse> => {
  const response = await api.post(`/objects/create/${companyId}`, payload);

  return response.data.data;
};

export const sendObjectFile = async (
  objectId: string,
  file: File
): Promise<SendFileResponse> => {
  const formData = new FormData();
  formData.append("upload_file", file);
  const response = await api.post(`/objects/send/file/${objectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const getObjectById = async (
  objectId: string
): Promise<GetObjectByIdResponse> => {
  const response = await api.get(`/objects/${objectId}`);

  return response.data.data;
};
