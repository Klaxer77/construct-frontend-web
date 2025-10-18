import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWork,
  getMaterials,
  getMaterialsDetails,
  getMaterialsProgress,
  type CreateWorkPayload,
} from "../api/materialsApi";

export const useMaterials = (object_id: string) =>
  useQuery({
    queryKey: ["materials", object_id],
    queryFn: () => getMaterials(object_id),
    enabled: !!object_id,
  });
export const useMaterialsDetails = (stage_progress_work_id: string) =>
  useQuery({
    queryKey: ["materialDetail", stage_progress_work_id],
    queryFn: () => getMaterialsDetails(stage_progress_work_id),
    enabled: !!stage_progress_work_id,
  });

export const useProgress = (object_id: string) =>
  useQuery({
    queryKey: ["progress", object_id],
    queryFn: () => getMaterialsProgress(object_id),
  });

export const useCreateWork = (object_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkPayload) => createWork(object_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials", object_id] });
    },
  });
};
