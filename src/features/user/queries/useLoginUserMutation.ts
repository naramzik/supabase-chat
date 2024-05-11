import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase/lib/client';

interface LoginUserMutationRequest {
  email: string;
  password: string;
}

export function useLoginUserMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (data: LoginUserMutationRequest) => {
      return await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === 'user';
        },
      });
      push('/');
      toast.success('로그인 되었습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
