import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Tables } from "@/supabase/types";

export interface ChatRoomApiResponse {
  id: string;
  room_name: string;
}

export function useCreateChatRoomMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: Pick<Tables<"ChatRoom">, "room_name">) =>
      axios
        .post<ChatRoomApiResponse>("/api/chat-room", request)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "chat-room-list",
      });
    },
  });
}
