import type { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseServer } from '@/supabase';

export default async function ChatRoom(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const { data: rooms } = await SupabaseServer.from('ChatRoom')
        .select('id, room_name')
        .order('createdAt', { ascending: false });

      return res.status(200).json({
        rooms,
      });
    }

    case 'POST': {
      const { data } = await SupabaseServer.from('ChatRoom')
        .insert({
          room_name: req.body.room_name,
        })
        .select('id')
        .single();
      return res.status(200).json({
        roomId: data?.id,
        room_name: req.body.room_name,
      });
    }

    case 'DELETE': {
      await SupabaseServer.from('ChatRoom').delete().eq('id', req.body.id);
      return res.status(200).send('ok');
    }

    default:
      return res.status(405).send('method not allowed');
  }
}
