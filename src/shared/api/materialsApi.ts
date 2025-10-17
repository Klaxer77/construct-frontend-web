import { api } from "./config";

interface SubMaterials {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  status_main: string;
  status_second: string;
  kpgz: string;
  volume: number;
  unit: string;
  percent: number;
}
interface MaterialsList {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  percent: number;
  stages: SubMaterials[];
}
interface MaterialsDetail {
  id: string;
  sender: string;
  date: string;
  request_number: string;
  receiver: string;
  item_name: string;
  size: string;
  quantity: string;
  net_weight: string;
  gross_weight: string;
  volume: string;
  carrier: string;
  vehicle: string;
  created_at: string;
}

interface Stage {
  title: string;
  date_from: string;
  date_to: string;
  kpgz: string;
  volume: number;
  unit: string;
}

export interface CreateWorkPayload {
  title: string;
  date_from: string;
  date_to: string;
  stages: Stage[];
}

export const getMaterials = async (
  object_id: string
): Promise<MaterialsList[]> => {
  const response = await api.get("/materials/list/work", {
    params: { object_id },
  });
  return response.data.data;
};

export const getMaterialsDetails = async (
  stage_progress_work_id: string
): Promise<MaterialsDetail[]> => {
  const response = await api.get(`/materials/list/${stage_progress_work_id}`);
  return response.data.data;
};

export const getMaterialsProgress = async (
  object_id: string
): Promise<{ progress: number }> => {
  const response = await api.get(`/materials/progress/${object_id}`);
  return response.data.data;
};

export const createWork = async (
  object_id: string,
  payload: CreateWorkPayload
) => {
  const response = await api.post(`/materials/create/works`, payload, {
    params: { object_id },
  });
  return response.data.data;
};
