import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllRemarks,
  getRemarkById,
  changeRemarkStatus,
  createRemark,
  type CreateRemarkRequest,
} from "../api/remarksApi";

export const useAllRemarks = (objectId: string) => {
  return useQuery({
    queryKey: ["remarks", objectId],
    queryFn: () => getAllRemarks(objectId),
    enabled: !!objectId,
  });
};

export const useRemarkById = (remarkId: string) => {
  return useQuery({
    queryKey: ["remark", remarkId],
    queryFn: () => getRemarkById(remarkId),
    enabled: !!remarkId,
  });
};

export const useChangeRemarkStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      remarkId,
      action,
    }: {
      remarkId: string;
      action: "accept" | "deny";
    }) => changeRemarkStatus(remarkId, action),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["remark", variables.remarkId],
      });
      queryClient.invalidateQueries({ queryKey: ["remarks"] });
    },
  });
};

export const useCreateRemark = (objectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      latitude,
      longitude,
      userData,
      files,
    }: {
      latitude: number;
      longitude: number;
      userData: CreateRemarkRequest[];
      files: File[];
    }) => createRemark(objectId, latitude, longitude, userData, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["remarks", objectId] });
    },
  });
};
