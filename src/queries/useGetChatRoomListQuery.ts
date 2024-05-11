import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Tables } from "@/supabase/types";

export interface ChatRoomApiResponse {
  rooms: Pick<Tables<"ChatRoom">, "id" | "room_name">[];
}

export function useGetChatRoomListQuery() {
  return useQuery({
    queryKey: ["chat-room-list"],
    queryFn: () =>
      axios.get<ChatRoomApiResponse>("/api/chat-room").then((res) => res.data),
  });
}
