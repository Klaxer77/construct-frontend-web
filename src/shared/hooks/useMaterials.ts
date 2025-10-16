import { useQuery } from "@tanstack/react-query";
import { getMaterials, getMaterialsDetails } from "../api/materialsApi";

export const useMaterials = () =>
  useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
export const useMaterialsDetails = (object_id: string, category_id: string) =>
  useQuery({
    queryKey: ["materialDetail"],
    queryFn: () => getMaterialsDetails(object_id, category_id),
    enabled: !!object_id && !!category_id,
  });
