import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase/lib/client';

interface CreateUserMutationRequest {
  username: string;
  email: string;
  password: string;
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (data: CreateUserMutationRequest) => {
      return await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'user',
      });
      toast.success('회원가입 되었습니다.');
      push('/');
    },
  });
}
