import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IntakeSubmission } from "../backend.d";
import { useActor } from "./useActor";

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<IntakeSubmission[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubmissions();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetSubmission(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<IntakeSubmission>({
    queryKey: ["submission", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No actor or id");
      return actor.getSubmission(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useSubmitIntakeForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      fullName: string;
      phone: string;
      email: string;
      propertyAddress: string;
      preferredContact: string;
      insuranceCompany: string;
      policyNumber: string;
      propertyType: string;
      dateOfLoss: string;
      causeOfLoss: string;
      damageDescription: string;
      fileIds: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitIntakeForm(
        params.fullName,
        params.phone,
        params.email,
        params.propertyAddress,
        params.preferredContact,
        params.insuranceCompany,
        params.policyNumber,
        params.propertyType,
        params.dateOfLoss,
        params.causeOfLoss,
        params.damageDescription,
        params.fileIds,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useUpdateSubmissionStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSubmissionStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useDeleteSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
