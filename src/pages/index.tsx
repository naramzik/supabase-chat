import Link from "next/link";
import { useState } from "react";
import { useGetChatRoomListQuery } from "@/features/chatroom/queries/useGetChatRoomListQuery";
import { useCreateChatRoomMutation } from "@/features/chatroom/queries/useCreateChatRoomMutation";
import { UserInfo } from "@/features/user/components/UserInfo";
import { UpdateUsername } from "@/features/user/components/UpdateUsername";
import { withUserGuard } from "@/features/user/guard/withUserGuard";

function Page() {
  const [chatRoomName, setChatRoomName] = useState("");

  const { data: rooms } = useGetChatRoomListQuery();
  const { mutate: createRoom } = useCreateChatRoomMutation();

  return (
    <main className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">채팅방 목록</h1>
        <UserInfo />
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

        <UpdateUsername />
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

export default withUserGuard(Page);
