import type { NextApiRequest, NextApiResponse } from "next";
import { SupabaseServer } from "@/supabase";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const accessToken =
    req.headers.authorization?.split(" ")[1] || req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  const { data } = await SupabaseServer.auth.getUser(accessToken);
  if (data.user === null) {
    return res.status(403).send("Forbidden");
  }

  switch (req.method) {
    case "POST": {
      const { message } = req.body;

      await SupabaseServer.from("Message").insert({
        chatRoomId: req.query["room-id"] as string,
        author: data.user.user_metadata.username,
        message,
      });

      return res.status(200).send("ok");
    }

    default:
      return res.status(405).send("method not allowed");
  }
}
