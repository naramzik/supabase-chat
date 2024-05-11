import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/supabase/lib/client";
import type { Tables } from "@/supabase/types";

export function useGetChatListQuery(roomId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase
      .channel("chat_room:" + roomId)
      .on<Tables<"Message">>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          filter: `chatRoomId=eq.${roomId}`,
        },
        (payload) =>
          queryClient.setQueriesData(
            {
              queryKey: ["chatroom", roomId],
            },
            (oldData: Tables<"Message">[] | undefined) => [
              ...(oldData ?? []),
              payload.new,
            ]
          )
      )
      .subscribe();
  }, [queryClient, roomId]);

  return useQuery({
    queryKey: ["chatroom", roomId],
    queryFn: async () => {
      const { data } = await supabase
        .from("Message")
        .select("*")
        .eq("chatRoomId", roomId)
        .order("createdAt", { ascending: true });

      return data;
    },
  });
}
