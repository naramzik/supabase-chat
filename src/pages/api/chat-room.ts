import type { NextApiRequest, NextApiResponse } from "next";
import { SupabaseServer } from "@/supabase";

export default async function ChatRoom(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { data: rooms } = await SupabaseServer.from("ChatRoom")
        .select("id, room_name")
        .order("createdAt", { ascending: false });

      return res.status(200).json({
        rooms,
      });
    }

    case "POST": {
      // TODO(@biyamn): 채팅방 생성하는 기능 만들기
      return res.status(200).json({
        roomId: "",
      });
    }

    case "DELETE": {
      // TODO(@biyamn): 채팅방 삭제하는 기능 만들기
      return res.status(200).send("ok");
    }

    default:
      return res.status(405).send("method not allowed");
  }
}
