import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/lib/client";

export function useLogoutUserMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "user";
        },
      });
      push("/auth");
    },
  });
}
