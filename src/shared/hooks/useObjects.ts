import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeCheckList,
  changeObjectAct,
  createCheckList,
  createObject,
  getCheckList,
  getObjectById,
  getObjectCategories,
  getObjects,
  getObjectsCount,
  sendObjectFile,
  type CheckListRequest,
  type CreateObjectRequest,
} from "../api/objectsApi";

export const useChangeObjectAct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      objectId,
      action,
    }: {
      objectId: string;
      action: "accept" | "deny";
    }) => changeObjectAct(objectId, action),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["object", variables.objectId],
      });
      queryClient.invalidateQueries({ queryKey: ["objects"] });
    },
  });
};

export const useChangeCheckList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      objectId,
      action,
    }: {
      objectId: string;
      action: "accept" | "deny";
    }) => changeCheckList(objectId, action),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["object", variables.objectId],
      });
      queryClient.invalidateQueries({ queryKey: ["objects"] });
    },
  });
};

export const useCreateCheckList = (objectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckListRequest) =>
      createCheckList(objectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["object", objectId] });
      queryClient.invalidateQueries({ queryKey: ["objects"] });
    },
  });
};

export const useObjects = (
  filterBy: Parameters<typeof getObjects>[0],
  companyId: string
) =>
  useQuery({
    queryKey: ["objects", filterBy, companyId],
    queryFn: () => getObjects(filterBy, companyId),
    enabled: !!companyId,
  });

export const useObjectCategories = () =>
  useQuery({
    queryKey: ["objectCategories"],
    queryFn: getObjectCategories,
  });

export const useObjectsCount = (
  filterBy: Parameters<typeof getObjectsCount>[0],
  companyId: string,
  categoryId: string | null = null
) =>
  useQuery({
    queryKey: ["objectsCount", filterBy, companyId, categoryId],
    queryFn: () => getObjectsCount(filterBy, companyId, categoryId),
  });

export const useCreateObject = (companyId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateObjectRequest) =>
      createObject(companyId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["objects"] }),
  });
};

export const useSendObjectFile = (objectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => sendObjectFile(objectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["object", objectId] });
      queryClient.invalidateQueries({ queryKey: ["objects"] });
    },
  });
};

export const useObjectById = (objectId: string) =>
  useQuery({
    queryKey: ["object", objectId],
    queryFn: () => getObjectById(objectId),
    enabled: !!objectId,
  });

export const useCheckList = (objectId: string) =>
  useQuery({
    queryKey: ["checkList", objectId],
    queryFn: () => getCheckList(objectId),
    enabled: !!objectId,
  });
