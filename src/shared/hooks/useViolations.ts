import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeViolationStatus,
  getAllViolations,
  getViolationById,
} from "../api/violationsApi";

export const useAllViolations = (objectId: string) => {
  return useQuery({
    queryKey: ["violations", objectId],
    queryFn: () => getAllViolations(objectId),
    enabled: !!objectId,
  });
};

export const useViolationById = (violationId: string) => {
  return useQuery({
    queryKey: ["violation", violationId],
    queryFn: () => getViolationById(violationId),
    enabled: !!violationId,
  });
};

export const useChangeViolationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      violationId,
      action,
    }: {
      violationId: string;
      action: "accept" | "deny";
    }) => changeViolationStatus(violationId, action),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["violation", variables.violationId],
      });
      queryClient.invalidateQueries({ queryKey: ["violations"] });
    },
  });
};
