import type { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { SupabaseServer } from "@/supabase";

export default async function ChatRoom(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      const { username, email, password } = req.body;

      // 유저 생성하기
      const {
        data: { user, session },
        error,
      } = await SupabaseServer.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        return res.status(422).json({
          code: error.code,
          message: error.message,
        });
      }

      // 혹시 모르는 경우를 대비하기 위해서...
      assert(user, "User Create Failed");
      assert(session, "Session Create Failed");

      // 세션 쿠키 설정
      res.setHeader(
        "Set-Cookie",
        `access_token=${session.access_token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${session.expires_in}`
      );

      // 값 전달
      return res.status(200).json({
        userId: user.id,
        accessToken: session.access_token,
      });
    }

    case "PUT": {
      // TODO(@biyamn): 유저 정보 업데이트 하기
      return res.status(200).send("ok");
    }

    case "DELETE": {
      // TODO(@biyamn): 유저 삭제하기
      return res.status(200).send("ok");
    }

    default:
      return res.status(405).send("method not allowed");
  }
}
