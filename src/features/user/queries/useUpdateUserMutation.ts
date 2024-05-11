import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import assert from 'assert';
import { supabase } from '@/supabase/lib/client';

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { username: string }) => {
      const { data: session } = await supabase.auth.getSession();
      assert(session.session, 'The user is not authenticated');
      return axios.put('/api/user', data, {
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
      toast.success('회원 정보가 변경되었습니다.');
    },
  });
}
