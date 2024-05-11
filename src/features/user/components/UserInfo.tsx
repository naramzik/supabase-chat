import { useGetUserQuery } from "@/features/user/queries/useGetUserQuery";
import { useLogoutUserMutation } from "@/features/user/queries/useLogoutUserMutation";
import { useSignOutUserMutation } from "@/features/user/queries/useSignOutUserMutation";

export function UserInfo() {
  const { data: user } = useGetUserQuery();

  const { mutate: logout } = useLogoutUserMutation();
  const { mutate: signOut } = useSignOutUserMutation();

  return (
    <div className="flex gap-2 items-center">
      <span>{user?.user_metadata.username} 로 로그인 됨</span>
      <button className="btn btn-sm btn-warning" onClick={() => logout()}>
        로그아웃
      </button>
      <button className="btn btn-sm btn-error" onClick={() => signOut()}>
        탈퇴하기
      </button>
    </div>
  );
}
