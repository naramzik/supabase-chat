import type { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseServer } from '@/supabase';

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const accessToken =
    req.headers.authorization?.split(' ')[1] || req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).send('Unauthorized');
  }

  const { data } = await SupabaseServer.auth.getUser(accessToken);
  if (data.user === null) {
    return res.status(403).send('Forbidden');
  }

  switch (req.method) {
    case 'PUT': {
      const { username } = req.body;

      const { error } = await SupabaseServer.auth.admin.updateUserById(
        data.user.id,
        {
          user_metadata: {
            username,
          },
        }
      );

      if (error) {
        return res.status(422).json({
          code: error.code,
          message: error.message,
        });
      }

      return res.status(200).send('ok');
    }

    case 'DELETE': {
      const { error } = await SupabaseServer.auth.admin.deleteUser(
        data.user.id
      );

      if (error) {
        return res.status(422).json({
          code: error.code,
          message: error.message,
        });
      }

      res.setHeader(
        'Set-Cookie',
        `access_token=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`
      );

      return res.status(200).send('ok');
    }

    default:
      return res.status(405).send('method not allowed');
  }
}
