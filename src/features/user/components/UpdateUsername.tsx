import { useState } from "react";
import { useUpdateUserMutation } from "@/features/user/queries/useUpdateUserMutation";

export function UpdateUsername() {
  const [username, setUsername] = useState("");

  const { mutate: updateUser } = useUpdateUserMutation();

  return (
    <>
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
    </>
  );
}
