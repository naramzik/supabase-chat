import Link from "next/link";
import { useState } from "react";
import { useGetChatRoomListQuery } from "@/queries/useGetChatRoomListQuery";
import { useCreateChatRoomMutation } from "@/queries/useCreateChatRoomMutation";

export default function Page() {
  const [chatRoomName, setChatRoomName] = useState("");

  const { data } = useGetChatRoomListQuery();
  const { mutate } = useCreateChatRoomMutation();

  return (
    <main className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">채팅방 목록</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="방 이름을 입력해주세요"
            className="input input-sm input-bordered"
            onChange={(e) => setChatRoomName(e.target.value)}
          />
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              mutate({ room_name: chatRoomName });
              setChatRoomName("");
            }}
          >
            방 만들기
          </button>
        </div>
      </header>
      <ul className="flex flex-col gap-2">
        {data?.rooms.map((room) => (
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
