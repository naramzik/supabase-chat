import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import assert from 'assert';
import { supabase } from '@/supabase/lib/client';

export function useSignOutUserMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      assert(session.session, 'The user is not authenticated');
      return axios.delete('/api/user', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === 'user';
        },
      });
      push('/auth');
      toast.success('탈퇴되었습니다.');
    },
  });
}
