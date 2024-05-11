import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Link from "next/link";
import { withUserGuard } from "@/features/user/guard/withUserGuard";
import { useGetChatListQuery } from "@/features/chatroom/queries/useGetChatListQuery";
import { useCreateMessageMutation } from "@/features/chatroom/queries/useCreateMessageMutation";

function Room() {
  const {
    query: { "room-id": roomId },
  } = useRouter();
  const [message, setMessage] = useState("");

  const { data } = useGetChatListQuery(roomId as string);
  const { mutate } = useCreateMessageMutation(roomId as string);

  const submit = useCallback(() => {
    if (!message) {
      return alert("메시지를 입력해주세요");
    }

    mutate(message);
    setMessage("");
  }, [message, mutate]);

  return (
    <div className="font-mono h-screen flex flex-col">
      <header className="sticky top-0 p-8 pb-4 bg-white flex gap-4 items-center">
        <Link href="/" className="btn btn-ghost">
          돌아가다
        </Link>
        <h1 className="text-xl font-bold">room: {roomId}</h1>
      </header>
      <div className="flex-1 flex flex-col gap-2 px-8">
        {data?.length === 0 && <p>메시지가 없습니다.</p>}
        {data?.map((message) => (
          <div key={message.id}>
            <b>{message.author}</b>: {message.message}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 sticky bottom-0 p-8 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="메시지를 입력해주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" type="submit">
          전송
        </button>
      </form>
    </div>
  );
}

export default withUserGuard(Room);
