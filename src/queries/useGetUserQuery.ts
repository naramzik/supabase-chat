import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/lib/client";

export function useGetUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });
}
