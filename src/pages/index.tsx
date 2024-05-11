import Link from "next/link";
import { useState } from "react";
import { useGetChatRoomListQuery } from "@/queries/useGetChatRoomListQuery";
import { useCreateChatRoomMutation } from "@/queries/useCreateChatRoomMutation";
import { useGetUserQuery } from "@/queries/useGetUserQuery";
import { useLogoutUserMutation } from "@/queries/useLogoutUserMutation";
import { Redirect } from "@/components/Redirect";
import { useSignOutUserMutation } from "@/queries/useSignOutUserMutation";
import { useUpdateUserMutation } from "@/queries/useUpdateUserMutation";

export default function Page() {
  const [chatRoomName, setChatRoomName] = useState("");
  const [username, setUsername] = useState("");

  const { data: user, isLoading } = useGetUserQuery();
  const { data: rooms } = useGetChatRoomListQuery();

  const { mutate: updateUser } = useUpdateUserMutation();
  const { mutate: createRoom } = useCreateChatRoomMutation();
  const { mutate: logout } = useLogoutUserMutation();
  const { mutate: signOut } = useSignOutUserMutation();

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return <Redirect path="/auth" />;
  }

  return (
    <main className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">채팅방 목록</h1>
        <div className="flex gap-2 items-center">
          <span>{user?.user_metadata.username} 로 로그인 됨</span>
          <button className="btn btn-sm btn-warning" onClick={() => logout()}>
            로그아웃
          </button>
          <button className="btn btn-sm btn-error" onClick={() => signOut()}>
            탈퇴하기
          </button>
        </div>
      </header>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="방 이름을 입력해주세요"
          className="input input-sm input-bordered"
          onChange={(e) => setChatRoomName(e.target.value)}
        />
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            createRoom({ room_name: chatRoomName });
            setChatRoomName("");
          }}
        >
          방 만들기
        </button>

        <input
          type="text"
          placeholder="변경할 이름을 입력해주세요"
          className="input input-sm input-bordered"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            updateUser({ username });
            setUsername("");
          }}
        >
          이름 변경하기
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {rooms?.rooms.map((room) => (
          <li
            key={room.id}
            className="border p-4 flex items-center justify-between"
          >
            <span className="font-bold">방 이름 : {room.room_name}</span>
            <Link href={`/room/${room.id}`} className="btn btn-sm btn-ghost">
              접속하기
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
