import { api } from "./config";

interface SubMaterials {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
}
interface MaterialsList {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  subcategories: SubMaterials[];
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

export const getMaterials = async (): Promise<MaterialsList[]> => {
  const response = await api.get("/materials/list");
  return response.data.data;
};

export const getMaterialsDetails = async (
  object_id: string,
  category_id: string
): Promise<MaterialsDetail[]> => {
  const response = await api.get(
    `/materials/list/detail/${object_id}/${category_id}`
  );
  return response.data.data;
};
