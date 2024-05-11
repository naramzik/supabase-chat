import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase/lib/client';

export function useLogoutUserMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === 'user';
        },
      });
      toast.success('로그아웃 되었습니다.');
      push('/auth');
    },
  });
}
