import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import assert from "assert";
import { supabase } from "@/supabase/lib/client";

export function useCreateMessageMutation(roomId: string) {
  return useMutation({
    mutationFn: async (message: string) => {
      const { data: session } = await supabase.auth.getSession();
      assert(session.session, "The user is not authenticated");
      return axios.post(
        `/api/chat/${roomId}`,
        { message },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
          },
        }
      );
    },
  });
}
